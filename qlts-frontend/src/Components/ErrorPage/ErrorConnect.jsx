import React, { Component } from 'react';
import '../../Styles/ErrorConnect.css';
import {Link} from 'react-router-dom';
class ErrorConnect extends Component {
    render() {
        return (
            <div style={{position: 'relative'}}>
                {/* Error Page */}
                <div className="error" style={{textAlign: 'center', lineHeight: 'calc(100vh)', fontSize: '25px'}}>
                    Không có kết nối
                </div>
                <div style={{position: 'absolute', bottom: 'calc(100vh - 58%)', textAlign: 'center', right: '0px', left: '0px'}}><Link to="/">Thử lại</Link></div>
                {/* Error Page */}

            </div>
        );
    }
}

export default ErrorConnect;