import React from 'react'
import { Route, Switch } from 'react-router'
import VideoComponent from '../video/VideoComponent'

const Router = () => {

    return (<Switch>
        <Route exact path="/">
            <VideoComponent />
        </Route>
    </Switch>)
}

export default Router