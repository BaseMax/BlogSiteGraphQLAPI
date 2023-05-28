import { InputType, OmitType } from "@nestjs/graphql";
import { SearchPostInput } from "src/modules/posts/dto/search-post.input";

@InputType()
export class CategoryPosts extends OmitType(SearchPostInput, ['categoryId']) { }
