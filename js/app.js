var my_news = [
  {
    author: 'Name_1',
    text: 'Text_1',
    bigText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, dolor, temporibus a fugiat asperiores quae, ullam corrupti, unde excepturi modi reiciendis vitae suscipit! Qui vitae consequuntur rem voluptatem velit rerum.'
  },
  {
    author: 'Name_2',
    text: 'Text_2',
    bigText: 'Voluptatem veritatis placeat alias porro nostrum ullam dolores, pariatur aliquid optio rerum recusandae obcaecati eius. Dolores, aspernatur aliquam, nisi, mollitia consequatur odio iste quibusdam beatae reiciendis fugit aperiam ullam ipsam.'
  },
  {
    author: 'Name_3',
    text: 'Text_3',
    bigText: 'Impedit asperiores maiores facilis, voluptates inventore dolore eius illo excepturi voluptatum explicabo alias earum aperiam atque, facere, obcaecati non vero nesciunt quis doloribus. Qui consequatur repudiandae ullam enim hic aliquid!'
  }
];

var Article = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
      bigText: React.PropTypes.string.isRequired
    })
  },

  getInitialState: function() {
    return {
      visible: false
    };
  },

  readmoreClick: function(e) {
    e.preventDefault();
    this.setState({visible: true});
  },

  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
        bigText = this.props.data.bigText,
        visible = this.state.visible;
    return (
      <div className = "article">
        <p className = "news_author">{author}:</p>
        <p className = "news_text">{text}</p>
        <a className = {"news_readmore " + (visible ? "none" : "")} 
          href="#" 
          onClick={this.readmoreClick}>
          More...
        </a>
        <p className = {"news_big-text " + (visible ? "": "none")}>{bigText}</p>
      </div>
    );
  }
});

var News = React.createClass({
  propTypes: {
      data: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      counter: 0
    };
  },

  render: function() {
    var data = this.props.data;
    var newsTemplate;

    if(data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          <div key = {index}>
            <Article data = {item} />
          </div>
        )
      })
    }
    else {
      newsTemplate = <p>Sorry...No news ;(</p>
    }
    return (
      <div className = "news">
        {newsTemplate}
        <strong 
          className = {'news_count ' + (data.length > 0 ? ' ' : 'none') }>
          Total news: {data.length}
        </strong>
      </div>
    );
  }
});

var TestInput = React.createClass({
  getInitialState: function() {
    return {
      myValue: ""
    };
  },

  onChangeHandler: function(e) {
    this.setState({myValue: e.target.value})
  },

  onBtnClickHandler: function() {
    console.log(this.refs);
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  },

  render: function() {
    return(
      <div className = "input-and-btn">
        <input 
          className = "test-input"
          defaultValue = ""
          ref = "myTestInput"
          placeholder = "Input value"
        />
        <button onClick = {this.onBtnClickHandler} ref = "alert_button">show alert</button>
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className = "app">
        <h3>NEWS</h3>
        <TestInput />
        <News data={my_news} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
