import './App.css';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components'
function App() {


  const [color, setColor] = useState('olive');
  
  return (
    <Background style = {{backgroundColor: color}}>
      <h1> Background Changer </h1>
      <Container >
            <Button onClick = {() => setColor("red")} style ={ {backgroundColor: "red"}}> Red </Button>
            <Button onClick = {() => setColor('green')} style ={ {backgroundColor: "green"}}> Green</Button>
            <Button onClick = {() => setColor('blue')} style ={ {backgroundColor: "blue"}}> Blue</Button>
            <Button onClick = {() => setColor('olive')} style ={ {backgroundColor: "Olive"}}> Olive </Button>
            <Button onClick = {() => setColor('grey')} style ={ {backgroundColor: "Grey"}}> Gray </Button>
            <Button onClick = {() => setColor('yellow')} style ={ {backgroundColor: "Yellow"}}> Yellow </Button>
            <Button onClick = {() => setColor('pink')} style ={ {backgroundColor: "Pink"}}> Pink </Button>
            <Button onClick = {() => setColor('purple')} style ={ {backgroundColor: "Purple"}}> Purple </Button>
            <Button onClick = {() => setColor('lavender')} style ={ {backgroundColor: "Lavender"}}> Lavender </Button>
            <Button onClick = {() => setColor('white')} style ={ {backgroundColor: "White",color: "black"}}> White </Button>
            <Button onClick = {() => setColor('black')} style ={ {backgroundColor: "Black"}}> Black </Button>
        </Container>
    </Background>
  )
}

const Background = styled.div`
height: 100vh;
width: 100%;
`;

const Container = styled.div`
    background-color: #bcc9f7;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 900px;
    padding: 20px;
    border-radius: 25px;
    position: relative;
    margin: auto;
    top: 64px;
`;

const Button = styled.button`
    font-size: 16px;
    padding: 15px;
    border: none;
    border-radius: 20px;
    color: white;
    cursor: pointer;
`;

export default App
