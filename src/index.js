import React from 'react'
import ReactDom from 'react-dom'
import {App} from './App'
import "./App.css"

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple').then(data => {
  console.log(data)
})


const app = document.getElementById('app')
ReactDom.render(<App/>, app)
