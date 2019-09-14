import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import AutocardImage from './AutocardImage';
import SortContext from './SortContext';

const SortedCards = ({ primary, secondary, tertiary, cards }) => {
  const groups = {};
  for (const [label1, primaryGroup] of Object.entries(sortIntoGroups(cards, primary))) {
    groups[label1] = {};
    for (const [label2, secondaryGroup] of Object.entries(sortIntoGroups(primaryGroup, secondary))) {
      groups[label1][label2] = sortIntoGroups(secondaryGroup, tertiary);
    }
  }
  return (
    getLabels(primary).filter(label1 => groups[label1]).map(label1 =>
      getLabels(secondary).filter(label2 => groups[label1][label2]).map(label2 =>
        getLabels(tertiary).filter(label3 => groups[label1][label2][label3]).map(label3 =>
          groups[label1][label2][label3].map(({ index, details }) =>
            <Col key={index} className="w-auto flex-grow-0">
              <div className="visualSpoilerCardContainer">
                <AutocardImage key={index} index={index} {...details} />
              </div>
            </Col>
          )
        )
      )
    )
  );
}

const VisualSpoiler = ({ cards, ...props }) => {
  return (
    <Row noGutters className="mt-3 justify-content-center" {...props}>
      <SortContext.Consumer>
        { value => <SortedCards cards={cards} {...value} /> }
      </SortContext.Consumer>
    </Row>
  );
}

export default VisualSpoiler;
