import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NoMatch from '../Components/ErrorPage/NoMatch';

class AuthorizedRoute extends Component {

    hasPermission() {
        try {
            const authorize = this.props.path;
            const permissions_set = this.props.PermissionReducer;

            //bỏ tham số truyền trên đường dẩn
            var res = authorize.split("/");
            var authorize_check = "/";
            for (var i = 0; i < res.length; i++) {
                if (i !== 0 && res[i].includes(":") === false) {
                    authorize_check += res[i] + "/";
                }
            }
            authorize_check = authorize_check.substring(0, authorize_check.length - 1);

            //kiểm tra url tồn tại trong ds url được phép truy cập
            if (permissions_set.includes(authorize_check)) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    }

    render() {
        const { component: Component, openAccessMenu, ...props } = this.props;

        return (
            <Route {...props} render={props => {
                return this.hasPermission()
                    ? <Component {...props} />
                    : this.props.PermissionReducer.length > 0 ? <NoMatch /> : <div className="check_permission">Check permission</div>
            }} />
        )
    }
}

export default connect(function (state) {
    return { PermissionReducer: state.PermissionReducer }
})(AuthorizedRoute);