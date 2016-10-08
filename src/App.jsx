var React = require('react');
var $ = require('jquery');


const Navbar = React.createClass({
    render: function () {
        return (
            <div className="navbar">
                <p className="header">RANDOM QUOTES</p>
            </div>
        );
    }
});

const QuoteWrapper = React.createClass({
    render: function () {
        return (
            <div className="QuoteWrapper">
                <QuoteBox />
            </div>
        );
    }
});


const QuoteBox = React.createClass({
    getInitialState: function () {
        return {
            quote: 'Quote here',
            author: 'Who said it?',
            category: 'programming'
        }
    },
    handleCategory: function (category) {
        this.setState({
            category: category
        });

        var selector = '#' + category;

        var categoryArr = ['movies', 'famous', 'programming', 'sarcastic'];

        categoryArr.forEach(function (val) {
            if (val == category) {
                selector = '#' + val;
                $(selector).css("color", "#000");
            } else {
                selector = '#' + val;
                $(selector).css('color', "grey");
            }
        })
    },
    componentWillMount: function () {

        var URL = "//quotes.stormconsultancy.co.uk/random.json";
        $.ajax({
            url: URL,
            dataType: 'jsonp',
            cache: true,
            success: function (data) {

                this.setState({ quote: data['quote'], author: data['author'] });

                var colors = ["#f78822", "#4a742c", "#e12828", "#FEC202", "#DA2021", "#527AC0", "#13ACD8", "#689550", "#E53059", "#6E4C96"],
                    currentColor = Math.floor(Math.random() * (colors.length - 1));

                $('.QuoteWrapper').css('background', colors[currentColor]);
                var newquotebgcolor = 'linear-gradient(to bottom, ' + colors[currentColor] + ' 50%, #000 50%)';
                $('.newquote').css('background-image', newquotebgcolor);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, err.toString());
            }.bind(this)
        });
    },
    getNewQuote: function () {
        var URL = "//quotes.stormconsultancy.co.uk/random.json";
        if (this.state.category == "movies" || this.state.category == "famous") {
            URL = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=" + this.state.category;
            $.ajax({
                url: URL,
                dataType: 'json',
                cache: true,
                headers: { 'X-Mashape-Key': 'j2rbmAvhvimshrTJkUHtmBEceNbgp1WJRG6jsnVVTDboDxcAIR', 'Cache-Control': 'max-age=1000' },
                success: function (data) {

                    this.setState({ quote: data['quote'], author: data['author'] });

                    var colors = ["#f78822", "#4a742c", "#e12828", "#FEC202", "#DA2021", "#527AC0", "#13ACD8", "#689550", "#E53059", "#6E4C96"],
                        currentColor = Math.floor(Math.random() * (colors.length - 1));

                    $('.QuoteWrapper').css('background', colors[currentColor]);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, err.toString());
                }.bind(this)
            });
        }
        if (this.state.category == "programming") {
            $.ajax({
                url: URL,
                dataType: 'jsonp',
                cache: true,
                success: function (data) {

                    this.setState({ quote: data['quote'], author: data['author'] });

                    var colors = ["#f78822", "#4a742c", "#e12828", "#FEC202", "#DA2021", "#527AC0", "#13ACD8", "#689550", "#E53059", "#6E4C96"],
                        currentColor = Math.floor(Math.random() * (colors.length - 1));

                    $('.QuoteWrapper').css('background', colors[currentColor]);
                    var newquotebgcolor = 'linear-gradient(to bottom, ' + colors[currentColor] + ' 50%, #000 50%)';
                    $('.newquote').css('background-image', newquotebgcolor);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, err.toString());
                }.bind(this)
            });
        }
        if (this.state.category == "sarcastic") {
            try {
                var obj = sarcasticJSON[Math.floor(Math.random() * sarcasticJSON.length)];
                this.setState({
                    quote: obj.quote,
                    author: obj.author
                });

                var colors = ["#f78822", "#4a742c", "#e12828", "#FEC202", "#DA2021", "#527AC0", "#13ACD8", "#689550", "#E53059", "#6E4C96"],
                    currentColor = Math.floor(Math.random() * (colors.length - 1));

                $('.QuoteWrapper').css('background', colors[currentColor]);
                var newquotebgcolor = 'linear-gradient(to bottom, ' + colors[currentColor] + ' 50%, #000 50%)';
                $('.newquote').css('background-image', newquotebgcolor);
            } catch (e) {
                console.log(e.code + ' ' + e.msg);
            }
        }
    },
    render: function () {
        return (
            <div className="QuoteBox">
                <div className="quote">
                    {this.state.quote}
                </div>
                <div className="author">
                    <i>-{this.state.author}</i>
                </div>
                <div className="category">
                    <i>
                        <ul className="categoryUL">
                            <li style={{ 'color': 'grey' }} className="categoryLI movies" id="movies" onClick={() => { this.handleCategory('movies') } }>#movies</li>
                            <li style={{ 'color': 'grey' }} className="categoryLI famous" id="famous" onClick={() => { this.handleCategory('famous') } }>#famous</li>
                            <li style={{ 'color': 'grey' }} className="categoryLI sarcastic" id="sarcastic" onClick={() => { this.handleCategory('sarcastic') } }>#sarcastic</li>
                            <li className="categoryLI programming" id="programming" onClick={() => { this.handleCategory('programming') } }>#programming</li>
                        </ul>
                    </i>
                </div>
                <div className="ButtonBox">
                    <NewQuote getNewQuote={this.getNewQuote} />
                    <Tweet quote={this.state.quote} author={this.state.author} />
                </div>
            </div>
        );
    }
});

const NewQuote = React.createClass({
    render: function () {
        return (
            <div className="newquote" onClick={this.props.getNewQuote}>
                New Quote
            </div>
        );
    }
});

const Tweet = React.createClass({
    render: function () {
        var quote = this.props.quote;
        var author = this.props.author;
        var url = "https://twitter.com/intent/tweet?text=" + quote
        if (quote.length + author.length < 160) {
            url = "https://twitter.com/intent/tweet?text=" + quote + ' -' + author;
        } else {
            url = "https://twitter.com/intent/tweet?text=" + quote;
        }
        return (
            <a href={url} target="_blank" className="tweetButton">
                <div className="tweet">
                    Tweet
                </div>
            </a>
        );
    }
});
const Footer = React.createClass({
    render: function () {
        return (
            <div className="footerWrapper">
                <div className="footer">
                    <div className="contact">
                        <a className="contactElement footercolor" href="mailto:ishanjain28@gmail.com">Contact</a>
                        <a className="contactElement footercolor" href="https://github.com/ishanjain28/random-quote-machine">Github</a>
                        <a className="contactElement footercolor" href="https://twitter.com/ishanjain28">Twitter</a>
                    </div>
                    <div className="sources">
                        <u><a className="sourceElement footercolor" href="https://market.mashape.com/andruxnet/random-famous-quotes">Random Quote API from Mashape</a></u>
                        <u><a className="sourceElement footercolor" href="http://quotes.stormconsultancy.co.uk/">Programming Quotes</a></u>
                    </div>
                </div>
            </div>
        )
    }
});
const App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <Navbar />
                <QuoteWrapper />
                <Footer />
            </div>
        );
    }
})
module.exports = App;


// I have to put this here. Because If I move it to a seperate file and then require it. The webpack will simply remove it from the bundle
// And it won't work
var sarcasticJSON = [
    {
        "quote": "If opposites attract then I hope you meet someone who is attractive, honest, intelligent, and cultured.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Arguing with you is like playing chess against a pigeon; no matter how good I am at chess, the pigeon will knock over the pieces, shit all over the board, and then stomp around victoriously without a fucking clue.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "If I agreed with you then we'd both be wrong.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "I'm trying to see things from your point of view, but I just can't seem to get my head that far up my own ass.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Don't feel bad. A lot of people have no talent!",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "I like you. People say I've no taste, but I like you.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "I don't know who you are, but whatever you are, I'm sure everyone will agree with me.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Sarcasm is a foreign language to you, isn't it?",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Looks like I over-estimated the number of your brain cells.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "He was happily married but his wife wasn't.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Sometimes I need what only you can provide: your absence.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Mirrors can’t talk, lucky for you they can’t laugh either.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Light travels faster than sound. This is why some people appear bright until they speak.",
        "author": "Steven Wright",
        "category": "sarcastic"
    },
    {
        "quote": "I’d tell you to go to hell, but I work there and don’t want to see your ugly mug every day.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Sarcasm is the body’s natural defense against stupidity.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Well my imaginary friend thinks you have serious mental problems",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "I couldn’t repair your brakes, so I made your horn louder.",
        "author": "Steven Wright",
        "category": "sarcastic"
    },
    {
        "quote": "I don’t follow my dreams…I ask them where they are going and find them later!",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "I used to have an open mind, but my brains kept falling out.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "I once thought I was wrong, but I was mistaken.",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "The person who laughs last at a joke..didn’t get it",
        "author": "Anonymous",
        "category": "sarcastic"
    },
    {
        "quote": "Bumper sticker: Honk If Your Horn Is Broken.",
        "author": "Anonymous",
        "category": "sarcastic"
    }
];