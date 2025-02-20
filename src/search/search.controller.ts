import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @MessagePattern({ cmd: 'create_doc' })
  create(@Payload() createSearchDto: CreateSearchDto) {
    return this.searchService.create(createSearchDto);
  }

  @MessagePattern({ cmd: 'find_all_docs' })
  findAll() {
    return this.searchService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_doc' })
  findOne(@Payload() id: string) {
    return this.searchService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_doc' })
  update(@Payload() payload: { id: string; updateSearchDto: UpdateSearchDto }) {
    return this.searchService.update(payload.id, payload.updateSearchDto);
  }

  @MessagePattern({ cmd: 'remove_doc' })
  remove(@Payload() id: string) {
    return this.searchService.remove(id);
  }

  @MessagePattern({ cmd: 'search_docs' })
  search(@Payload() query: string) {
    return this.searchService.search(query);
  }
}
