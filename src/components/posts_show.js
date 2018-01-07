import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if(!post) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button className='btn btn-danger pull-xs-right' onClick={this.onDeleteClick.bind(this)}>
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// ownProps is the props owned by the component PostsShow those that are going to  the component
// this.props === ownProps
function mapStateToProps(state, ownProps) {
    const posts = state.posts; // all of the posts in app state

    return {post: posts[ownProps.match.params.id]};
}
// fetchPost is the action creator
export default connect(mapStateToProps, {fetchPost, deletePost })(PostsShow);