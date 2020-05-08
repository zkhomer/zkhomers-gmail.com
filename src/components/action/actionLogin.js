import actionFetch from "./actionFetch";
import getGQL from "../getGQL";

const actionAuthLogin = (token) => ({type: "AUTH_LOGIN", token});
let GQL = getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql");
export default function actionLogin(login, password) {
    return (async dispatch => {


        let token = await dispatch(actionFetch("login", GQL(
            `query login($login: String, $password: String){
          login(login: $login, password: $password)
      }`,
            {login, password}
        )))

        dispatch(actionAuthLogin(token.data.login))
    })
}