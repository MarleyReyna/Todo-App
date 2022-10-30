<script>
import Data from '../Data';
import { v4 as uuidv4 } from "uuid";
import draggable from "vuedraggable";



export default {
  components: {
    draggable,
  },
  data() {
    return {
      todos: [...Data],
      todo: '',
      shown: null,
      dragging: false,
      enabled: true,
    }
  },
  methods: {
    submitTodo: function(){
        if(this.todo === '') return;

        const todosCopy = [...this.todos]
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        let currentDate = month + 1 + "-" + day + "-" + year;

        todosCopy.push({
            createdAt: currentDate,
            task: this.todo,
            active: true,
            id: uuidv4()
        })
        this.todo = ''
        this.todos = [...todosCopy]
    },
    deleteTodo: function(id){
        const todosCopy = [...this.todos].filter(x =>{
            return x.id != id 
        });
        this.todos = [...todosCopy];
    },
    completeTodo: function(id){
        const todosCopy = [...this.todos];
        todosCopy.find(x => x.id === id).active = !todosCopy.find(x => x.id === id).active;
        this.todos = [...todosCopy]
    },
    clearCompleted: function(){
        const todoRemove = this.todos.filter(x => {
            return x.active === true;
        });

        this.todos = [...todoRemove];
    },
    filterList: function(){
        console.log('poopoo')
        if(this.shown === null){
            return this.todos
        } else if(this.shown === true){
            return this.todos.filter(x => x.active === true)
        } else{
            return this.todos.filter(x => x.active === false)
        }
    }
  }
}
</script>

<template>
    <main>
        <form @submit.prevent="submitTodo">
            <button class="submit" type="submit">
                <div class="gradient-helper"/>
            </button>
            <input class="global-font" placeholder="Create a new todo..." v-model='todo'/>
        </form>

        <section class="todos">
            <ul>
                <draggable 
                :list="filterList()"
                :disabled="!enabled"
                item-key="id"
                @start="dragging = true"
                @end="dragging = false">
                    <template #item="{element}">
                        <li :id="element.id">
                            <button class="submit" :class="{complete: !element.active}" @click="completeTodo(element.id)" type="button">
                                <div class="gradient-helper"/>
                                <svg xmlns="http://www.w3.org/2000/svg" alt="Todo Completed" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
                            </button>
                            <button class="todo global-font" :class="{complete: !element.active}" @click="completeTodo(element.id)">{{ element.task }}</button>
                            <button class="remove" @click="deleteTodo(element.id)"><svg alt="Remove Todo" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></button>
                        </li>
                    </template>
                </draggable>
            </ul>
            <div class="bottom">
                <p class="global-font">{{ todos.filter((val) => val.active).length }} items left</p>
                <section class="todo-actions">
                    <button @click="shown = null" :class="{'active': shown === null}" type="button">All</button>
                    <button @click="shown = true" :class="{'active': shown === true}" type="button">Active</button>
                    <button @click="shown = false" :class="{'active': shown === false}" type="button">Completed</button>
                </section>
                <button class="global-font" @click="clearCompleted">Clear Completed</button>
            </div>
        </section>

        <section class="todo-actions">
            <button @click="shown = null" :class="{'active': shown === null}" type="button">All</button>
            <button @click="shown = true" :class="{'active': shown === true}" type="button">Active</button>
            <button @click="shown = false" :class="{'active': shown === false}" type="button">Completed</button>
        </section>
    </main>
</template>

<style lang="scss">
    main{
        width: 100%;
        display: flex;
        flex-direction: column;
        max-width: 33.75rem;
        margin-top: 2.5rem;

        .submit{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 1.25rem;
            min-width: 1.25rem;
            margin-right: .75rem;
            border: none;
            border-radius: 50%;
            background: #393A4B;

            .gradient-helper{
                width: 1.125rem;
                height: 1.125rem;
                border-radius: 50%;
                background-color: #25273D;
            }
        }

        .submit:hover{
            border: none;
            background: linear-gradient(135deg, #55DDFF 0%, #C058F3 100%);
        }
        
        form{
            width: 100%;
            display: flex;
            align-items: center;
            border-radius: 5px;
            background: #25273D;
            padding: .875rem 1rem .875rem 1.25rem;
            box-shadow: 0px 35px 50px -15px rgba(0, 0, 0, 0.5);

            input{
                width: 100%;
                border: none;
                color: #C8CBE7;
                caret-color: #3A7CFD;
                background-color: transparent;
            }

            :focus{
                outline: none;
            }

            ::placeholder{
                color: #767992;
            }
        }

        .todos{
            margin-top: 1rem;
            border-radius: 5px;
            background: #25273D;
            box-shadow: 0px 35px 50px -15px rgba(0, 0, 0, 0.5);        

            ul{
                list-style: none;
                
                li{
                    display: flex;
                    align-items: center;
                    padding: .78125rem 1.25rem;
                    border-bottom: 1px #393A4B solid;

                    .submit.complete{
                        background: linear-gradient(135deg, #55DDFF 0%, #C058F3 100%);

                        .gradient-helper{
                            display: none;
                        }

                        svg{
                            display: initial;
                            margin: auto;
                        }
                    }

                    .submit{
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        svg{
                            display: none;
                        }
                    }

                    .todo{
                        border: none;
                        padding: .5rem 0;
                        white-space: nowrap;
                        overflow: hidden;
                        text-align: left;
                        text-overflow: ellipsis;
                        color: #C8CBE7;
                        background-color: transparent;
                        transition: color 300ms ease;
                    }

                    .todo.complete{
                        text-decoration: line-through;
                        color: #4D5067;
                    }

                    .remove{
                            border: none;
                            margin-left: auto;
                            background-color: transparent;
                    }
                }
            }
        }

        .bottom{
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #5B5E7E;
            padding: 1rem 1.25rem 1.25rem 1.25rem;

            button{
                border: none;
                background-color: transparent;
                transition: color 300ms ease;
            }

            button:hover{
                color: white;
            }

            .todo-actions{
                display: none;
            }

            p, button{
                color: #5B5E7E;
            }
        }

        .todo-actions{
            display: flex;
            justify-content: center;
            gap: 0 1.1875rem;
            padding: .9375rem 0;
            border-radius: 5px;
            margin-top: 1rem;
            background: #25273D;
            box-shadow: 0px 35px 50px -15px rgba(0, 0, 0, 0.5);

            button{
                border: none;
                font-weight: 700;
                font-size: 14px;
                line-height: 14px;
                letter-spacing: -0.194444px;
                color: #5B5E7E;
                background-color: transparent;
                transition: color 300ms ease;
            }

            button:hover{
                color: white;
            }

            .active{
                color: #3A7CFD;
            }
        }
    }

    @media only screen and (min-width: 48rem){
        main{
            margin-top: 3rem;

            form{
                padding: 1.25rem 1.5rem;
            }

            .submit{
                min-width: 1.5rem;
                height: 1.5rem;

                .gradient-helper{
                    width: 1.375rem;
                    height: 1.375rem;
                }
            }

            .todos{
                margin-top: 1.5rem;
                ul{
                    li{
                        padding: 1.25rem 1.5rem;

                        .todo{
                            padding: 0;
                        }
                    }
                }

                .bottom{
                    padding: 1rem 1.5rem 1.25rem;

                    p, button{
                        font-size: 14px;
                        line-height: 14px;
                        letter-spacing: -0.194444px;
                    }

                    .todo-actions{
                        display: flex;
                        padding: 0;
                        margin: 0;
                        gap: 0 1.125rem;
                    }
                }
            }

            .todo-actions{
                display: none;
            }
        }
    }
</style>
