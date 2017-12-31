window.ee = new EventEmitter();

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

var Add = React.createClass({

  getInitialState: function() {
    return{
      agreeNotChecked: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };
  },

  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
    console.log("author in focus");
  },

  onCheckRuleClick: function(e) {
    this.setState({ agreeNotChecked: !this.state.agreeNotChecked });
    console.log("checkbox is checked");
  },

  onBtnClickHandler: function(e) {
    e.preventDefault();
    var textEl = ReactDOM.findDOMNode(this.refs.text);

    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = textEl.value;
    var statusCheckBox = ReactDOM.findDOMNode(this.refs.checkrule).value;
    console.log(author + " - " + text + "\n" + statusCheckBox);
    
    var item = [{
      author: author,
      text: text,
      bigText: "..."
    }];

    window.ee.emit("News.add", item);

    textEl.value = "";
    this.setState({textIsEmpty: true});

  },

  onFieldChange: function(fieldName, e) {
    if(e.target.value.trim().length > 0) {
      this.setState({["" + fieldName]: false})
    }
    else {
      this.setState({["" + fieldName]: true})
    }
  },

  render: function() {
    var agreeNotChecked = this.state.agreeNotChecked;
    var authorIsEmpty = this.state.authorIsEmpty;
    var textIsEmpty = this.state.textIsEmpty;
    return(
      <form className = "add cf">
        <p className = "name_author">
          Author name: 
          <input 
            type = "text"
            className = "add_author"
            onChange = {this.onFieldChange.bind(this, "authorIsEmpty")}
            ref = "author"
            placeholder = "Your name"
          />
        </p>
        <p className = "add_news_text">New text:
          <textarea placeholder = "Input your text"
            onChange = {this.onFieldChange.bind(this, "textIsEmpty")}
            ref = "text">
          </textarea>
        </p>
        <label className = "add_checkrule">
          <p className = "accept-policy">
            I'm accept policy
            <input type = "checkbox"
              defaultChecked = {false}
              ref = "checkrule"
              onChange = {this.onCheckRuleClick}
            />
          </p>
        </label>
        <button className = "add_btn"
          onClick = {this.onBtnClickHandler}
          ref = "alert_button"
          disabled = {agreeNotChecked || authorIsEmpty || textIsEmpty}>
            Add article
        </button>
      </form>
    );
  }
});

var App = React.createClass({

  getInitialState: function() {
    return {
      news: my_news
    };
  },

  componentDidMount: function() {
    var self = this;
    window.ee.addListener("News.add", function(item) {
      var nextNews = item.concat(self.state.news);
      self.setState({news: nextNews});
    });
  },

  componentWillUnmount: function() {
    window.ee.removeListener("News.add");
  },

  render: function() {
    console.log("render");
    return (
      <div className = "app">
        <Add />
        <h3>NEWS</h3>
        <News data={this.state.news} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
