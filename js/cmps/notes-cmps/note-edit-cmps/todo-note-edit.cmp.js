'use strict';

import notesService from '../../../services/miss-keep-services/notes-service.js';

export default {
    name: 'todo-note',
    props: ['note'],
    template: `
        <section>
            <form @submit.prevent.stop="onAddTodo" class="flex space-between">
                <input type="text" placeholder="Add todo" v-model="newTodoTxt"/>
                <button>+</button>
            </form>
            <ul class="clean-list todo-list">
                <li v-for="(todo, idx) in note.todos">
                    <button @click.stop.prevent="onRemoveTodo(idx)">X</button>
                    {{todo.txt}}
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            newTodoTxt: '',
        }
    },
    methods: {
        onAddTodo() {
            this.note.todos.unshift(notesService.createTodo(this.newTodoTxt));
            this.newTodoTxt = '';
        },
        onRemoveTodo(idx) {
            this.note.todos.splice(idx, 1);
        },
    }
}