var my_news = [
  {
    author: 'Name_1',
    text: 'Text_1'
  },
  {
    author: 'Name_2',
    text: 'Text_2'
  },
  {
    author: 'Name_3',
    text: 'Text_3'
  }
];

var News = React.createClass({
  render: function() {
    var data = this.props.data;
    var newsTemplate = data.map(function(item, index) {
      return (
        <div key = {index}>
          <p className = "news_author">{item.author}:</p>
          <p className = "news_text">{item.text}</p>
        </div>
      );
    })

    return (
      <div className = "news">
        {newsTemplate}
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className = "app">
        q all! Im component App and i can display news!

        <News data={my_news} />

        <Comments />

      </div>
    );
  }
});

var Comments = React.createClass({
  render: function() {
    return (
      <div className = "comments">
        No comments...
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
