import PropTypes from 'prop-types';
import css from './SectionName.module.css';

export default function SectionName({ title }) {
  return <>{title && <h2 className={css.subTitle}>{title}</h2>}</>;
}

SectionName.propTypes = {
  title: PropTypes.string,
};
