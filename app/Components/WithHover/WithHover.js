import React from 'react';


export default function withHover (Component, propsName = 'hovering') {
    return class WithHover extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
              hovering: false,
            };
        
            this.mouseOut = this.mouseOut.bind(this);
            this.mouseOver = this.mouseOver.bind(this);
          }
        
          mouseOver(id) {
            this.setState({
              hovering: true,
            });
          }
        
          mouseOut(id) {
            this.setState({
              hovering: false,
            });
          }
          render() {
              const props = {
                  [propsName]: this.state.hovering,
                  ...this.props
              }
              return (
                  <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    <Component {...props} />
                  </div>
              )
          }
    }
}