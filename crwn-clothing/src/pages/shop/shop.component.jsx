import React from "react";
import { Route } from "react-router-dom";
import {connect} from "react-redux";

import {UpdateCollections} from "../../redux/shop/shop.actions"

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionsOverview from "../../components/collection-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";


import {firestore, convertCollectionsSnapshopToMap} from "../../firebase/firebase.utils"

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections')

    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshopToMap(snapshot)
      updateCollections(collectionsMap)
      this.setState({loading: false})
    })
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
} 

const mapDispatchToProps = (dispatch) => ({
  updateCollections: collectionsMap => dispatch(UpdateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
