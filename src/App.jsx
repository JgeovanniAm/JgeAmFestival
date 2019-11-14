import React, { useState, useContext } from 'react';
import { Route, Switch, __RouterContext } from 'react-router-dom';
// react-spring
import { useTransition, animated } from 'react-spring';
import Home from './pages/Home';
import Products from './pages/product';
import Car from './pages/car';
import Video from './pages/video';
import Register from './pages/register';
import Favourite from './pages/favourite';
import { AlvProvider } from './settings/context';
import './index.scss';

function App() {
  // context reactRouter
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: { opacity: 0, transform: "translate(100%,0)" },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" },
  });

  // context data car and favorite

  const [cardBag, setCardBag] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const valueContext = {
    cardBag: cardBag,
    favorite: favorite,
    addCarFunc: funcCar,
  }

  function funcCar(object, statebtn) {
    if (statebtn === 'car') setCardBag([...cardBag, object]);
    else if(statebtn === 'favourite') setFavorite({...favorite, object});
    // else {
    //   const objectFound = cardBag.findIndex(x => x.id === object.id);
    //   cardBag.splice(objectFound, 1);
    //   setCardBag([...cardBag]);
    // }
  }

  return (
    <>
      {
        transitions.map(({ item, props, key }) => (
          <animated.div className="wrapper" key={key} style={props} >
            <Switch location={item} >
              <Route exact path="/" render={() => (
                <AlvProvider value={valueContext} >
                  <Home />
                </AlvProvider>
              )} />
              <Route path="/product" render={() => (
                <AlvProvider value={valueContext} >
                  <Products />
                </AlvProvider>
              )} />
              <Route path="/video" render={() => (
                <AlvProvider value={valueContext} >
                  <Video />
                </AlvProvider>
              )} />
              <Route path="/car" render={() => (
                <AlvProvider value={valueContext} >
                  <Car />
                </AlvProvider>
              )} />
              <Route path="/favourite" render={() => (
                <AlvProvider value={valueContext} >
                  <Favourite />
                </AlvProvider>
              )} />
              <Route path="/register/:status" render={() => (
                <AlvProvider value={valueContext} >
                  <Register />
                </AlvProvider>
              )} />
            </Switch>
          </animated.div>
        ))
      }
    </>
  )
}
export default App