var Blog = React.createClass({
  getInitialState: function(){
    return {entries:[]};
  },
  componentDidMount: function(){
    this.loadBlog();
  },
  loadBlog: function(){
    $.ajax({
     url: "/entries.json",
     type: 'get',
     dataType: 'json',
     success: function(data){
       this.setState({entries:data});
     }.bind(this),
     error: function(xhr, err, status){
       console.error(err.toString());
       console.error(xhr.status);
       console.error(xhr.responseText);
     }.bind(this)
   });
  },
  render: function(){
    var allEntries = this.state.entries.map(function(entry){
      return(<Entry data={entry} key={entry.id}/>);
    });
    return(
      <div>{allEntries}</div>
    );
  }
});

var Entry = React.createClass({
  render: function(){
    var date = new Date(this.props.data.created_at);
    var dateString = date.getMonth() + "/"+ date.getDate() + "/" + date.getFullYear();
    return(
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.data.title}</div>
        <div className="panel-body">
          <h4>Posted by: {this.props.data.officer} on {dateString}</h4>
          {this.props.data.body}
        </div>
      </div>
    );
  }
});
