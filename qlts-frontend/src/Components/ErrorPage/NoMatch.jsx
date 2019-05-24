import React, { Component } from 'react';
import '../../Styles/404.css';


class NoMatch extends Component {
    render() {
        return (
            <section id="pg_not-found">
                <div className="pg_not_circles">
                    <p>404<br />
                        <small>PAGE NOT FOUND</small>
                    </p>
                    <span className="circle big" />
                    <span className="circle med" />
                    <span className="circle small" />
                </div>
            </section>
        );
    }
}

export default NoMatch;