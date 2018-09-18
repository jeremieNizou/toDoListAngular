import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from "./todo";

@Pipe({
  name: 'myFilter',
  pure: false
})
export class MyFilterPipe implements PipeTransform {

  transform(items: Todo[], filter: Todo): Todo[] {
   if (!items || !filter) {
		return items;
	}
	return items.filter((item: Todo) => this.applyFilter(item, filter));
  }

	applyFilter(todo: Todo, filter: Todo): boolean {
		for (let field in filter) {
			if (filter[field]) {
				if (typeof filter[field] === 'string') {
					if (todo[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
					return false;
				}
				} else if (typeof filter[field] === 'number') {
					if (todo[field] !== filter[field]) {
						return false;
					}
				}
			}
		}
		return true;
	}
}