import React = require('react');
import ReactDOM = require('react-dom');

export function fitWidth(WrappedComponent: any, withRef: boolean = true) {
    class ResponsiveComponent extends React.Component<any, any> {
        static getDisplayName(Series: any) {
            let name = Series.displayName || Series.name || 'Series';
            return name;
        }

        static defaultProps = {
            displayName: `fitWidth(${ResponsiveComponent.getDisplayName(WrappedComponent)})`
        }

        constructor(props: any) {
            super(props);
            this.handleWindowResize = this.handleWindowResize.bind(this);
            this.getWrappedInstance = this.getWrappedInstance.bind(this);
        }

        componentDidMount() {
            window.addEventListener('resize', this.handleWindowResize);
            let el = ReactDOM.findDOMNode(this);
            let w = (el.parentNode as Element).clientWidth;

            /* eslint-disable react/no-did-mount-set-state */
            this.setState({
                width: w
            });
            /* eslint-enable react/no-did-mount-set-state */
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleWindowResize);
        }

        handleWindowResize() {
            let el = ReactDOM.findDOMNode(this);
            let w = (el.parentNode as Element).clientWidth;
            this.setState({
                width: w
            });
        }

        getWrappedInstance() {
            return (this.refs as any).component;
        }

        render() {
            let ref = withRef ? {ref: 'component'} : {};

            if (this.state && this.state.width) {
                return <WrappedComponent width={this.state.width} {...this.props} {...ref} />;
            } else {
                return <div/>;
            }
        }
    }

    return ResponsiveComponent;
}
