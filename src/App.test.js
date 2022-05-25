import React from "react";
import App, { Todo, TodoForm, useTodos } from "./App";
import { shallow, configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

configure({ adapter: new Adapter() });

describe("App", () => {
  describe("Todo component", () => {
    test("Execute completeTodo on complete btn is clicked", () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        text: "Hello world",
      };
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );
      wrapper.find("button").at(0).simulate("click");
      expect(completeTodo.mock.calls).toEqual([[5]]);
      expect(removeTodo.mock.calls).toEqual([]);
    });

    test("Execute removeTodo on complete btn is clicked", () => {
      const completeTodo = jest.fn();
      const removeTodo = jest.fn();
      const index = 5;
      const todo = {
        isCompleted: true,
        text: "Hello world",
      };
      const wrapper = shallow(
        <Todo
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          index={index}
          todo={todo}
        />
      );
      wrapper.find("button").at(1).simulate("click");
      expect(removeTodo.mock.calls).toEqual([[5]]);
      expect(completeTodo.mock.calls).toEqual([]);
    });
  });
  describe("Todo form", () => {
    test("Call addTodo whe the form had a value", () => {
      const newTodoValue = "Hola mundo!";
      const addTodo = jest.fn();
      const preventDefault = jest.fn();
      const wrapper = shallow(<TodoForm addTodo={addTodo} />);
      wrapper
        .find("input")
        .simulate("change", { target: { value: newTodoValue } });
      wrapper.find("form").simulate("submit", { preventDefault });
      expect(addTodo.mock.calls).toEqual([[newTodoValue]]);
      expect(preventDefault.mock.calls).toEqual([[]]);
    });
  });
  describe("Test useTodo", () => {
    const createUseTodoWrapper = () => {
      const TestComponent = (props) => {
        const hook = props.hook();
        return <div {...hook}></div>;
      };
      return shallow(<TestComponent hook={useTodos} />);
    };
    test("addTodo", () => {
      const addTodoParam = "Test text";
      const wrapper = createUseTodoWrapper();
      let props = wrapper.find("div").props();
      const originalArrayLength = props.todos.length;
      props.addTodo(addTodoParam);
      // Refresh props
      props = wrapper.find("div").props();
      expect(props.todos[0]).toEqual({
        text: addTodoParam,
      });
      expect(props.todos.length).toBeGreaterThan(originalArrayLength);
    });
    test("removeTodo", () => {
      const wrapper = createUseTodoWrapper();
      let props = wrapper.find("div").props();
      const originalArrayLength = props.todos.length;
      const indexToDelte = 1;
      const originalObject = props.todos[indexToDelte];
      props.removeTodo(indexToDelte);
      props = wrapper.find("div").props();
      expect(
        props.todos.find((t) => t.text === originalObject.text)
      ).toBeFalsy();
      expect(props.todos.length).toBeLessThan(originalArrayLength);
      expect(props.todos[indexToDelte]).not.toEqual(originalObject);
    });
    test("completeTodo", () => {
      const wrapper = createUseTodoWrapper();
      let props = wrapper.find("div").props();
      const originalArrayLength = props.todos.length;
      const indexToComplete = 1;
      props.completeTodo(indexToComplete);
      props = wrapper.find("div").props();
      expect(props.todos[indexToComplete].isCompleted).toBeTruthy();
      expect(props.todos.length).toEqual(originalArrayLength);
    });
  });
  describe("Verify App component", () => {
    test("Add a new todo", () => {
      const wrapper = mount(<App />);
      const prevent = jest.fn();
    });
  });
});
