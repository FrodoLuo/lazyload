import React from 'react';

export default class LazyImage extends React.Component {
    state = {
        visible: false,
    }
    componentDidMount() {
        if (window.IntersectionObserver) {
            this.observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this.setState({
                        visible: true
                    });
                    this.observer.disconnect();
                }
            });
            this.observer.observe(this.props.offset ? this.refs['scout'] : this.refs['img']);
        }
    }
    render() {
        const p = { ...this.props };
        delete p.src;
        return (
            <div style={{...p.style, position: 'relative'}} className={p.className}>
                <div ref={'scout'} style={{ top: `-${p.offset || 0}px`, position: 'absolute' }} />
                <img {...p} ref={'img'} src={this.state.visible ? this.props.src : null}></img>
            </div >
        );
    }
}