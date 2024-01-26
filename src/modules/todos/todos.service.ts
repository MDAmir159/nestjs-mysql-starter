import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todos.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/create.todo';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(dto: CreateTodoDto) {
    const todo = this.todoRepository.create(dto);
    return await this.todoRepository.save(todo);
  }

  findMany() {
    return this.todoRepository.find();
  }

  async update(id: number, dto: CreateTodoDto) {
    const currentTodo = await this.todoRepository.findOne({ where: { id } });

    Object.assign(currentTodo, dto);
    await this.todoRepository.save(currentTodo);
    return currentTodo;
  }

  async delete(id: number) {
    const currentTodo = await this.todoRepository.findOne({ where: { id } });
    return await this.todoRepository.remove(currentTodo);
  }
}
