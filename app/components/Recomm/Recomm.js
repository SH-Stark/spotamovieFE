import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import ActionCreators from '../../actions';

const POSTER = 'https://image.tmdb.org/t/p/w500';


const styles = {
  posterCard: {
    borderRadius: 10,
    width: 250,
    height: 400,
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
  poster: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#494953',
  },
}

const buttonStyle = {
  start:{
    padding: 20,
    margin: 50,
    backgroundColor:'#494953',
    borderRadius:30,
    borderWidth: 1,
    borderColor: '#fff'
  },
  startText:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20
  }
}

class Recomm extends Component {

  state = {
    cardIndex: 0
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.movieRecomm !== nextProps.movieRecomm) {
      console.log(nextProps);
      this.props.getMovieFromId(nextProps.movieRecomm);
    }
    // this.setState({ cardIndex: this.state.cardIndex + 1 });
  }

  componentDidMount() {
    this.props.getMovieRecommendation()
    console.log('this.state.cardIndex in didmount: ', this.state.cardIndex);
  }


  newReccom = movie => {
    console.log('cardIndex in newReccom: ', this.state.cardIndex)
    this.props.getMovieRecommendation()
    console.log(this.props.movies);
  }


  render() {

    const movie = this.props.movie;
    console.log(movie);

    if (!movie) {
      return <View><Text>No recommendation</Text></View>;
    }

    return (
      <View style={{ backgroundColor: '#494953', flexDirection: 'column', flex: 1,  alignItems: 'center' }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
          <Text style={{ margin: 20, fontSize: 20, color: 'white' }}>
            Recommendations
          </Text>
          <View style={styles.poster}>
            <Image
              style={styles.posterCard}
              source={{uri: `${POSTER}/${movie.poster_path}`}}
            />
          </View>
        </View>
        <View style={styles.container}>
          <TouchableHighlight
            style={buttonStyle.start}
            onPress={this.newReccom}
            underlayColor='#fff'>
              <Text style={buttonStyle.startText}>Give me another one !</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    movie: state.movies.find(movie =>  movie.id === state.movieRecomm.movieId),
    movieRecomm: state.movieRecomm.movieId,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMovieFromId: (movieId) => dispatch(ActionCreators.getMovieFromId(movieId)),
  getMovieRecommendation: () => dispatch(ActionCreators.getMovieRecommendation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Recomm);