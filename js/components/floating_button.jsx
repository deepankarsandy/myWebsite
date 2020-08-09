import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class FloatButton extends PureComponent {
	render() {
		const { icon, position, className, ...otherProps } = this.props;
		const cx = classNames('button float-button', className, position);

		return (
			<button className={cx} {...otherProps}>
				<span className="icon">
					<i className={icon} />
				</span>
			</button>
		)
	}
}

FloatButton.propTypes = {
	icon: PropTypes.string,
	position: PropTypes.string,
};

FloatButton.defaultProps = {
	icon: 'fas fa-chevron-down fa-lg',
	position: 'bottom',
};
