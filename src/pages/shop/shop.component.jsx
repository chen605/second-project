import React from "react";
import { Route } from "react-router-dom";
import {connect} from "react-redux";

import {UpdateCollections} from "../../redux/shop/shop.actions"
 
import CollectionsOverview from "../../components/collection-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";


import {firestore, convertCollectionsSnapshopToMap} from "../../firebase/firebase.utils"

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections')

    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshopToMap(snapshot)
      updateCollections(collectionsMap)
    })
  }

  render(){
    const {match} = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
      </div>
    );
  }
}  

const mapDispatchToProps = (dispatch) => ({
  updateCollections: collectionsMap => dispatch(UpdateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
