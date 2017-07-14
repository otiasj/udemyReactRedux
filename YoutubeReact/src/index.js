import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';

const YOUTUBE_API_KEY = 'AIzaSyC1FOf-PnSUfWLx848yWB3DJv9F4mHugDk';

// Create a new component. This component should produce some html
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };

        //do a youtube search set the result in the state object
       this.videoSearch('unity game tutorial')
    }

    //trigger a search
    videoSearch(term) {
        YTSearch({ key: YOUTUBE_API_KEY, term: term }, videos => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    //rendering of this page
    render() {
        //wrap the videosearch function in a "debounced" function that will only be called every 300ms
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                />
            </div>
        )
    }
}

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));