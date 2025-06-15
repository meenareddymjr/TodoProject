/**
 * This class represents todo item.
 * It contains id, title, text and date.
 */
export class Todo {
  constructor(
    public id: number,
    public title: string,
    public text: string,
    public date: string
  ) {}
}
