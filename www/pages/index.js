import React from 'react'
// import styled from 'styled-components'
import Link from 'next/link'
//

import logoImg from '../src/logo.png'

// const Styles = styled('div')`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   align-items: center;
//   justify-content: center;
//   padding: 5vw;
//   text-align: center;

//   .backgrounds {
//     overflow: hidden;
//     pointer-events: none;
//     position: absolute;
//     z-index: -1;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;

//     .background1,
//     .background2 {
//       position: absolute;
//       left: 0;
//       top: 0;
//       width: 100%;
//       height: 100%;
//     }

//     .background1 {
//       transform: scale(3) rotate(50deg);
//       transform-origin: top left;
//       background: linear-gradient(
//         to bottom,
//         rgba(0, 120, 150, 0.05),
//         transparent 15px
//       );
//     }

//     .background2 {
//       transform: scale(3) rotate(-25deg);
//       transform-origin: top right;
//       background: linear-gradient(
//         to bottom,
//         rgba(0, 120, 150, 0.05),
//         transparent 15px
//       );
//     }
//   }

//   img {
//     width: 100%;
//     max-width: 800px;
//     height: auto;
//   }

//   h1 {
//     position: absolute;
//     opacity: 0;
//     pointer-events: none;
//   }

//   h2 {
//     width: 400px;
//     max-width: 100%;
//     color: rgba(0, 0, 0, 0.8);
//   }

//   p {
//     max-width: 750px;
//   }

//   .github {
//     margin-top: 2rem;
//     width: 150px;
//   }
// `

export default function Home() {
  return (
    <div>
      <div className="backgrounds">
        <div className="background1" />
        <div className="background2" />
      </div>
      <img src={logoImg} alt="" />
      <h1>React Charts</h1>
      <h2>Simple, immersive &amp; interactive charts for React</h2>
      <div className="github">
        <a href="https://github.com/react-tools/react-charts">
          <img
            src="https://img.shields.io/github/stars/react-tools/react-charts.svg?style=social&label=Star"
            alt="Github Stars"
          />
        </a>
      </div>
    </div>
  )
}
