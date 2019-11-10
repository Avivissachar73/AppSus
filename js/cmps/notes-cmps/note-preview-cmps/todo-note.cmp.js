'use strict';

export default {
    name: 'todoNote',
    props: ['note'],
    template: `
        <div>
            <form @submit.prevent="onAddTodo" class="flex space-between width-all">
                <input type="text" placeholder="Add todo" v-model="newTodoTxt"/>
                <button>+</button>
            </form>
            <ul class="clean-list todo-list">
                <li v-for="todo in note.todos" :key="todo.id" class="flex align-center width-all" @click="onMarkTodo(todo.id)">
                    <button @click.stop="onRemoveTodo(todo.id)">X</button>
                    <div :class="{'done-todo': todo.isDone}">{{todo.txt}}</div>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
            newTodoTxt: ''
        }
    },
    methods: {
        onRemoveTodo(todoId) {
            notesService.removeTodo(this.note.id, todoId)
                .then(() => console.log('todo was removed successfully'));
        },
        onMarkTodo(todoId) {
            notesService.markTodo(this.note.id, todoId)
                .then(() => console.log('todo was toggled!'))
        },
        onAddTodo() {
            if (!this.newTodoTxt) return;
            notesService.addTodo(this.note.id, this.newTodoTxt);
            this.newTodoTxt = '';
        },
    }
}