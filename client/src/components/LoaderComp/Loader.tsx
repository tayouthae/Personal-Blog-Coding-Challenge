import React, { FC, useEffect, useRef } from 'react';
import { Row } from 'reactstrap';
import lottie, { AnimationItem } from 'lottie-web';
import classNames from 'classnames';
import style from './Loader.module.css';

export const Loader: FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animation: AnimationItem;
    if (container?.current) {
      animation = lottie.loadAnimation({
        container: container.current as HTMLDivElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        // path to your animation file, place it inside public folder
        path: `${`${process.env.PUBLIC_URL}/blog.json`}`,
      });
    }
    return () => animation?.destroy();
  }, []);

  return (
    <Row justify="center" className={classNames(style.loaderWrapper, 'stage')}>
      <div ref={container} className={style.loader} />
    </Row>
  );
};
