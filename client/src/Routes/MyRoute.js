import {BrowserRouter,Switch,Route} from "react-router-dom"
import App from "../App"
import EditComponent from "../components/EditComponent"
import FormComponent from "../components/FormComponent"
import LoginComponent from "../components/LoginComponent"
import SingleComponent from "../components/SingleComponent"
import AdminRoute from "../Routes/AdminRoute"

const MyRoute=()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={App}/>
                <AdminRoute path={"/create"} exact component={FormComponent}/>
                <Route path={"/blog/:slug"} exact component={SingleComponent}/>
                <AdminRoute path={"/blog/edit/:slug"} exact component={EditComponent}/>
                <Route path={"/login"} exact component={LoginComponent}/>
            </Switch>
        </BrowserRouter>
    )
}

export default MyRoute;