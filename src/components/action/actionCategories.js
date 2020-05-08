import actionFetch from "./actionFetch";
import getGQL from "../getGQL";
let GQL = getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql");
const actionCategories = () => {
    return (async dispatch => {
        let categories = await dispatch(actionFetch("categories", GQL(`query cats{
      CategoryFind(query: "[{}]"){
        _id name parent{
          name
        }
        subCategories {
          name
        }
        goods {
          name
          images {
            _id, url
          }
        }
          }
    }`)))


    })
}
export default actionCategories