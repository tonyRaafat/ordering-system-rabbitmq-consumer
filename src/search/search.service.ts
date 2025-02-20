import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';

@Injectable()
export class SearchService {
  private readonly index = 'products';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async create(createSearchDto: CreateSearchDto) {
    const document = {
      id: Date.now().toString(),
      ...createSearchDto,
      createdAt: new Date(),
    };

    await this.elasticsearchService.index({
      index: this.index,
      document,
    });

    return document;
  }

  async findAll() {
    console.log('findAll');

    const { hits } = await this.elasticsearchService.search({
      index: this.index,
      query: { match_all: {} },
    });
    console.log(hits.hits);
    return hits.hits.map((item) => item._source);
  }

  async findOne(id: string) {
    try {
      const { _source } = await this.elasticsearchService.get({
        index: this.index,
        id,
      });
      return _source;
    } catch (error) {
      if (error.meta?.statusCode === 401) {
        throw new UnauthorizedException('Invalid Elasticsearch credentials');
      }
      throw error;
    }
  }

  async update(id: string, updateSearchDto: UpdateSearchDto) {
    try {
      const document = await this.elasticsearchService.update({
        index: this.index,
        id,
        doc: updateSearchDto,
      });
      return document;
    } catch (error) {
      if (error.meta?.statusCode === 401) {
        throw new UnauthorizedException('Invalid Elasticsearch credentials');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.elasticsearchService.delete({
        index: this.index,
        id,
      });
    } catch (error) {
      if (error.meta?.statusCode === 401) {
        throw new UnauthorizedException('Invalid Elasticsearch credentials');
      }
      throw error;
    }
  }

  async search(query: string) {
    try {
      const { hits } = await this.elasticsearchService.search({
        index: this.index,
        query: {
          multi_match: {
            query,
            fields: ['name', 'description'],
          },
        },
      });
      return hits.hits.map((item) => item._source);
    } catch (error) {
      if (error.meta?.statusCode === 401) {
        throw new UnauthorizedException('Invalid Elasticsearch credentials');
      }
      throw error;
    }
  }
}
