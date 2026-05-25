import { beforeEach, expect, test } from 'vitest'
import {createTodolistAC, deleteTodolistAC} from "../todolists-reducer.ts";
import {TasksStateType} from "@/common/types/Types.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC, tasksReducer} from "../tasks-reduser.ts";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        todolistId1: [
            { id: '1', taskName: 'CSS', isComplete: false },
            { id: '2', taskName: 'JS', isComplete: true },
            { id: '3', taskName: 'React', isComplete: false },
        ],
        todolistId2: [
            { id: '1', taskName: 'bread', isComplete: false },
            { id: '2', taskName: 'milk', isComplete: true },
            { id: '3', taskName: 'tea', isComplete: false },
        ],
    }
})


test('array should be created for new todolist', () => {
    const endState = tasksReducer(startState, createTodolistAC('New todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('New key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})


test('property with todolistId should be deleted', () => {
    const endState = tasksReducer(startState, deleteTodolistAC({id: 'todolistId2'}))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
    // or
    expect(endState['todolistId2']).toBeUndefined()
})


test('correct task should be deleted', () => {
    const endState = tasksReducer(
        startState,
        deleteTaskAC({ todolistID: 'todolistId2', taskID: '2' })
    )

    expect(endState).toEqual({
        todolistId1: [
            { id: '1', taskName: 'CSS', isComplete: false },
            { id: '2', taskName: 'JS', isComplete: true },
            { id: '3', taskName: 'React', isComplete: false },
        ],
        todolistId2: [
            { id: '1', taskName: 'bread', isComplete: false },
            { id: '3', taskName: 'tea', isComplete: false },
        ],
    })
})


test('correct task should be created at correct array', () => {
    const endState = tasksReducer(
        startState,
        createTaskAC({
            todolistID: 'todolistId2',
            taskName: 'juice',
        })
    )

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(4)
    expect(endState.todolistId2[0].id).toBeDefined()
    expect(endState.todolistId2[0].taskName).toBe('juice')
    expect(endState.todolistId2[0].isComplete).toBe(false)
})


test('correct task should change its status', () => {
    const endState = tasksReducer(
        startState,
        changeTaskStatusAC({ todolistID: 'todolistId2', taskID: '2', isDone: false })
    )

    expect(endState.todolistId2[1].isComplete).toBe(false)
    expect(endState.todolistId1[1].isComplete).toBe(true)
})


test('correct task should change its title', () => {
    const endState = tasksReducer(
        startState,
        changeTaskTitleAC({ todolistID: 'todolistId2', taskID: '2', taskName: 'juice' })
    )
    expect(endState).toEqual({
        todolistId1: [
            { id: '1', taskName: 'CSS', isComplete: false },
            { id: '2', taskName: 'JS', isComplete: true },
            { id: '3', taskName: 'React', isComplete: false },
        ],
        todolistId2: [
            { id: '1', taskName: 'bread', isComplete: false },
            { id: '2', taskName: 'juice', isComplete: true },
            { id: '3', taskName: 'tea', isComplete: false },
        ],
    })
})