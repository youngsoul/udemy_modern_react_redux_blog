import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from "../actions";
import _ from 'lodash';
import { Link } from 'react-router-dom';



class PostsIndex extends Component {

    // called by React after the component is shown on the dom
    // runs exactly one time
    componentDidMount() {
        this.props.fetchPosts();
    }


    renderPosts() {

        // remember - this is an object with id as the key, value as the post data
        // lodash has a map function for an object/map
        return _.map(this.props.all_posts, post => { // _.map(this.props.all_posts, function(post) {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            );
        });
    }

    render() {
        //console.log(this.props.all_posts);
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}


// just passing, {fetchPosts} to connect is the same as creating the mapDispatchToProps function.
// the lines below are equivalent to the connect call at the end
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({fetchPosts}, dispatch);
// }
// export default connect(null, mapDispatchToProps)(PostsIndex);

function mapStateToProps(state) {
    // state.posts <- same key name 'posts' as used in reduces/index.js
    return {all_posts: state.posts};
}
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
