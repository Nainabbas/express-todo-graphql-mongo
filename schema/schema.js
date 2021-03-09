const graphql = require("graphql");
const Todo = require("../models/todo.model");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = graphql;

const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    todo: { type: GraphQLString },
    isDone: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Todo.findById(args.id);
      }
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find();
      }
    }
  }
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        todo: { type: GraphQLString },
        isDone: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let todo = new Todo({
          todo: args.todo,
          isDone: args.isDone
        });
        return todo.save();
      }
    },
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        todo: { type: GraphQLString },
        isDone: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
       return Todo.findByIdAndUpdate(args.id, {
          todo: args.todo,
          isDone: args.isDone
        },{new: true});
      }
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Todo.findByIdAndDelete(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
