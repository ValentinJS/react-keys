import sinon from 'sinon';
import {
  calculMarginOnLeft,
  calculMarginOnRight,
  calculMarginOnDown,
  calculMarginOnTop,
  correctBoundsMargin,
  determineGeo,
  isReachableRight,
  isReachableLeft,
  isReachableDown,
  isReachableTop,
  boundsMargin,
} from '../bounds';
import * as helpers from '../helpers';

describe('bounds', () => {
  describe('boundsMargin', () => {
    it(
      'should calcul left dir',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: '2',
        };
        this.stub(helpers, 'calculateElSpace')
          .onCall(0)
          .returns({
            id: '1',
            top: 5,
            left: 5,
            right: 5,
            down: 5,
          })
          .onCall(1)
          .returns({
            id: '0',
            top: 5,
            left: -50,
            right: 10,
            down: 5,
          });
        this.stub(document, 'getElementById');
        document.getElementById.withArgs('1').returns({});
        document.getElementById.withArgs('2').returns({});
        boundsMargin('1', state, { test: 'tatatatatat' }).should.eql({
          marginTop: 0,
          marginLeft: -5,
          elements: [
            {
              id: '1',
              coords: { top: 5, left: 5, right: 5, down: 5 },
              isVisible: false,
            },
          ],
        });
      })
    );

    it(
      'should calcul right dir if geo === right',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 20, down: 20, width: 2 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: '2',
        };
        this.stub(helpers, 'calculateElSpace')
          .onCall(0)
          .returns({
            id: '1',
            top: 5,
            left: 20,
            right: 5,
            down: 5,
          })
          .onCall(1)
          .returns({
            id: '0',
            top: 5,
            left: 25,
            right: 10,
            down: 5,
          });
        this.stub(document, 'getElementById');
        document.getElementById.withArgs('1').returns({});
        document.getElementById.withArgs('2').returns({});
        boundsMargin('1', state, {}).should.eql({
          marginTop: 0,
          marginLeft: -3,
          elements: [
            {
              id: '1',
              coords: { top: 5, left: 5, right: 5, down: 5 },
              isVisible: false,
            },
          ],
        });
      })
    );

    it(
      'should calcul right dir if geo === equal',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 20, down: 20, width: 2 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: '2',
        };
        this.stub(helpers, 'calculateElSpace')
          .onCall(0)
          .returns({
            id: '1',
            top: 5,
            left: 20,
            right: 5,
            down: 5,
          })
          .onCall(1)
          .returns({
            id: '0',
            top: 5,
            left: 20,
            right: 10,
            down: 5,
          });
        this.stub(document, 'getElementById');
        document.getElementById.withArgs('1').returns({});
        document.getElementById.withArgs('2').returns({});
        boundsMargin('1', state, {}).should.eql({
          marginTop: 0,
          marginLeft: -3,
          elements: [
            {
              id: '1',
              coords: { top: 5, left: 5, right: 5, down: 5 },
              isVisible: false,
            },
          ],
        });
      })
    );

    it(
      'should calcul up dir',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 20, down: 20, width: 2 },
          marginLeft: -3,
          marginTop: -50,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: '2',
        };
        this.stub(helpers, 'calculateElSpace')
          .onCall(0)
          .returns({
            id: '1',
            top: 10,
            left: 20,
            right: 5,
            down: 5,
          })
          .onCall(1)
          .returns({
            id: '0',
            top: 5,
            left: 20,
            right: 10,
            down: 5,
          });
        this.stub(document, 'getElementById');
        document.getElementById.withArgs('1').returns({});
        document.getElementById.withArgs('2').returns({});
        boundsMargin('1', state, {}).should.eql({
          marginTop: 0,
          marginLeft: -3,
          elements: [
            {
              id: '1',
              coords: { top: 5, left: 5, right: 5, down: 5 },
              isVisible: false,
            },
          ],
        });
      })
    );

    it(
      'should calcul down dir',
      sinon.test(function() {
        const state = {
          wrapper: {
            left: 10,
            top: 10,
            right: 20,
            down: 20,
            width: 2,
            height: 2,
          },
          marginLeft: 0,
          marginTop: 50,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: '2',
        };
        this.stub(helpers, 'calculateElSpace')
          .onCall(0)
          .returns({
            id: '1',
            top: 5,
            left: 20,
            right: 5,
            down: 5,
          })
          .onCall(1)
          .returns({
            id: '0',
            top: 10,
            left: 20,
            right: 10,
            down: 5,
          });
        this.stub(document, 'getElementById');
        document.getElementById.withArgs('1').returns({});
        document.getElementById.withArgs('2').returns({});
        boundsMargin('1', state, {}).should.eql({
          marginTop: -3,
          marginLeft: -3,
          elements: [
            {
              id: '1',
              coords: { top: 5, left: 5, right: 5, down: 5 },
              isVisible: false,
            },
          ],
        });
      })
    );

    it(
      'should return same values if props BUT selected id !== next id',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
        };

        boundsMargin('2', state, {}).should.eql({
          marginTop: 0,
          marginLeft: 0,
          elements: [
            {
              coords: {
                down: 5,
                left: 5,
                right: 5,
                top: 5,
              },
              id: '1',
            },
          ],
        });
      })
    );

    it(
      'should return same values if props & selected id !== next id & current BUT no next element',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: '1',
        };

        this.stub(document, 'getElementById');
        document.getElementById.withArgs('1').returns({});
        boundsMargin('2', state, {}).should.eql({
          marginTop: 0,
          marginLeft: 0,
          elements: [
            {
              coords: {
                down: 5,
                left: 5,
                right: 5,
                top: 5,
              },
              id: '1',
            },
          ],
        });
      })
    );

    it(
      'should return same values if props & selected id !== next id & current & next BUT no wrapper element',
      sinon.test(function() {
        const state = {
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: '1',
        };

        this.stub(document, 'getElementById');
        document.getElementById.withArgs('1').returns({});
        document.getElementById.withArgs('2').returns({});
        boundsMargin('2', state, {}).should.eql({
          marginTop: 0,
          marginLeft: 0,
          elements: [
            {
              coords: {
                down: 5,
                left: 5,
                right: 5,
                top: 5,
              },
              id: '1',
            },
          ],
        });
      })
    );

    it(
      'should recompute margin on left if geo === horizontal && !isReachableLeft',
      sinon.test(function() {
        const state = {
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          downLimit: 0,
          rightLimit: 0,
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          rightGap: 0,
          leftGap: 0,
          downGap: 0,
          selectedId: '1',
        };

        this.stub(document, 'getElementById');

        boundsMargin('2', state, {}).should.eql({
          marginTop: 0,
          marginLeft: 0,
          elements: [
            {
              coords: {
                down: 5,
                left: 5,
                right: 5,
                top: 5,
              },
              id: '1',
            },
          ],
        });
      })
    );
  });

  describe('correctBoundsMargin', () => {
    it(
      'should return updated margin left when needed',
      sinon.test(function() {
        const state = {
          wrapper: { left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          leftGap: 0,
        };

        const focusedId = '1';

        this.stub(helpers, 'calculateElSpace').returns({
          id: '1',
          top: 5,
          left: 5,
          right: 5,
          down: 5,
        });

        correctBoundsMargin(focusedId, state).should.eql({
          marginLeft: -5,
          marginTop: 0,
        });
      })
    );

    it(
      'should return no updated margin left',
      sinon.test(function() {
        const state = {
          wrapper: { left: 5, top: 10, right: 10, down: 10, width: 100 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: -0, right: 5, down: 5 } },
          ],
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          leftGap: 0,
        };

        const focusedId = '1';

        this.stub(helpers, 'calculateElSpace').returns({
          id: '1',
          top: 5,
          left: -0,
          right: 5,
          down: 5,
        });

        correctBoundsMargin(focusedId, state).should.eql({
          marginLeft: 0,
          marginTop: 0,
        });
      })
    );

    it(
      'should return updated margin top when needed',
      sinon.test(function() {
        const state = {
          wrapper: { height: 10, left: 10, top: 10, right: 10, down: 10 },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: -50, left: 5, right: 5, down: 5 } },
          ],
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          leftGap: 0,
        };

        const focusedId = '1';

        this.stub(helpers, 'calculateElSpace').returns({
          id: '1',
          top: -50,
          left: 5,
          right: 5,
          down: 5,
        });

        correctBoundsMargin(focusedId, state).should.eql({
          marginLeft: -5,
          marginTop: 60,
        });
      })
    );

    it(
      'should return no updated margin top',
      sinon.test(function() {
        const state = {
          wrapper: {
            height: 200,
            left: 10,
            top: 10,
            right: 10,
            down: 10,
            width: 100,
          },
          marginLeft: 0,
          marginTop: 0,
          elements: [
            { id: '1', coords: { top: 5, left: 5, right: 5, down: 5 } },
          ],
          gap: 0,
          boundedGap: 0,
          topGap: 0,
          leftGap: 0,
        };

        const focusedId = '1';

        this.stub(helpers, 'calculateElSpace').returns({
          id: '1',
          top: 5,
          left: 5,
          right: 5,
          down: 5,
        });

        correctBoundsMargin(focusedId, state).should.eql({
          marginLeft: 0,
          marginTop: 0,
        });
      })
    );
  });

  describe('determineGeo', () => {
    it(
      'should return horizontal left if current el left > next el left',
      sinon.test(function() {
        const current = { left: 10 };
        const next = { left: 5 };

        determineGeo(current, next).should.eql({
          horizontal: 'left',
          vertical: 'equal',
        });
      })
    );

    it(
      'should return horizontal right if current el left < next el left',
      sinon.test(function() {
        const current = { left: 5 };
        const next = { left: 10 };

        determineGeo(current, next).should.eql({
          horizontal: 'right',
          vertical: 'equal',
        });
      })
    );

    it(
      'should return horizontal equal if current el left === next el left',
      sinon.test(function() {
        const current = { left: 10 };
        const next = { left: 10 };

        determineGeo(current, next).should.eql({
          horizontal: 'equal',
          vertical: 'equal',
        });
      })
    );

    it(
      'should return vertical down if current el top > next el top',
      sinon.test(function() {
        const current = { top: 10 };
        const next = { top: 5 };

        determineGeo(current, next).should.eql({
          horizontal: 'equal',
          vertical: 'top',
        });
      })
    );

    it(
      'should return horizontal right if current el top < next el top',
      sinon.test(function() {
        const current = { top: 5 };
        const next = { top: 10 };

        determineGeo(current, next).should.eql({
          horizontal: 'equal',
          vertical: 'down',
        });
      })
    );

    it(
      'should return horizontal right if current el top === next el top',
      sinon.test(function() {
        const current = { top: 10 };
        const next = { top: 10 };

        determineGeo(current, next).should.eql({
          horizontal: 'equal',
          vertical: 'equal',
        });
      })
    );
  });

  describe('isReachableTop', () => {
    it('should return false if selectedEl.top + marginTop < 0 + gap', () => {
      const selectedId = { top: 115 };
      const gap = 120;
      const marginTop = -15;
      isReachableTop(selectedId, gap, marginTop).should.be.false;
    });

    it('should return true if selectedEl.top + marginTop > 0 + gap', () => {
      const selectedId = { top: 115 };
      const gap = 90;
      const marginTop = -15;
      isReachableTop(selectedId, gap, marginTop).should.be.true;
    });

    it('should return true if selectedEl.top + marginTop = 0 + gap', () => {
      const selectedId = { top: 115 };
      const gap = 100;
      const marginTop = -15;
      isReachableTop(selectedId, gap, marginTop).should.be.true;
    });
  });

  describe('isReachableDown', () => {
    it('should return false if wrapper height < selected down + marginTop + gap', () => {
      const wrapper = { height: 200 };
      const selectedId = { down: 220 };
      const gap = 10;
      const marginTop = -15;
      isReachableDown(wrapper, selectedId, gap, marginTop).should.be.false;
    });

    it('should return true if wrapper height >= selected down + marginTop + gap', () => {
      const wrapper = { height: 20 };
      const selectedId = { down: 5 };
      const gap = 10;
      const marginTop = 0;
      isReachableDown(wrapper, selectedId, gap, marginTop).should.be.true;
    });

    it('should return true if wrapper height = selected down + marginTop + gap', () => {
      const wrapper = { height: 15 };
      const selectedId = { down: 5 };
      const gap = 10;
      const marginTop = 0;
      isReachableDown(wrapper, selectedId, gap, marginTop).should.be.true;
    });
  });

  describe('isReachableLeft', () => {
    it('should have margin left value of 0 when no specified', () => {
      const selectedId = { left: 35 };
      const gap = 10;
      isReachableLeft(selectedId, gap).should.be.true;
    });

    it('should return true if selected left + marginLeft > gap', () => {
      const selectedId = { left: 35 };
      const gap = 10;
      const marginLeft = -15;
      isReachableLeft(selectedId, gap, marginLeft).should.be.true;
    });

    it('should return false if selected left + marginLeft < gap', () => {
      const selectedId = { left: 25 };
      const gap = 10;
      const marginLeft = -20;
      isReachableLeft(selectedId, gap, marginLeft).should.be.false;
    });

    it('should return true if selected left + marginLeft = gap', () => {
      const selectedId = { left: 20 };
      const gap = 10;
      const marginLeft = -10;
      isReachableLeft(selectedId, gap, marginLeft).should.be.true;
    });
  });

  describe('isReachableRight', () => {
    it('should have margin left value of 0 when no specified', () => {
      const wrapper = { width: 10 };
      const selectedId = { right: 25 };
      const gap = 10;
      isReachableRight(wrapper, selectedId, gap).should.be.false;
    });

    it('should return false if wrapper width < selected right - marginLeft + gap', () => {
      const wrapper = { width: 10 };
      const selectedId = { right: 25 };
      const gap = 10;
      const marginLeft = -10;
      isReachableRight(wrapper, selectedId, gap, marginLeft).should.be.false;
    });

    it('should return true if wrapper width > selected right - marginLeft + gap', () => {
      const wrapper = { width: 20 };
      const selectedId = { right: 5 };
      const gap = 3;
      const marginLeft = -10;
      isReachableRight(wrapper, selectedId, gap, marginLeft).should.be.true;
    });

    it('should return true if wrapper width = selected right - marginLeft + gap', () => {
      const wrapper = { width: 20 };
      const selectedId = { right: 5 };
      const gap = 5;
      const marginLeft = -10;
      isReachableRight(wrapper, selectedId, gap, marginLeft).should.be.true;
    });
  });

  describe('calculMarginOnTop', () => {
    it('should return down selectedEl coords by default', () => {
      const wrapper = { top: 0 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const topGap = 0;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(-10);
    });

    it('should minor wrapper top from selectedEL cords top', () => {
      const wrapper = { top: 5 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const topGap = 0;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(-5);
    });

    it('should minor gap from that', () => {
      const wrapper = { top: 5 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 3;
      const boundedGap = 0;
      const topGap = 0;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(-2);
    });

    it('should use boundedGap if gap < 0', () => {
      const wrapper = { top: 5 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 15;
      const boundedGap = 2;
      const topGap = 3;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(0);
    });

    it('should use topGap if boundedGap does not exist', () => {
      const wrapper = { top: 5 };
      const selectedEl = { coords: { top: 10 } };
      const gap = 15;
      const boundedGap = 0;
      const topGap = 3;
      calculMarginOnTop(
        wrapper,
        selectedEl,
        gap,
        boundedGap,
        topGap
      ).should.equal(0);
    });
  });

  describe('calculMarginOnDown', () => {
    it('should return down selectedEl coords by default', () => {
      const wrapper = { height: 0 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const downLimit = 50;
      const downGap = 0;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-10);
    });

    it('should minor wrapper from selectedEl coords down', () => {
      const wrapper = { height: 5 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const downLimit = 50;
      const downGap = 0;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-5);
    });

    it('should add gap from that', () => {
      const wrapper = { height: 5 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 3;
      const boundedGap = 0;
      const downLimit = 50;
      const downGap = 0;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-8);
    });

    it('should use boundedGap if gap > downLimit', () => {
      const wrapper = { height: 5 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 45;
      const boundedGap = 10;
      const downLimit = 50;
      const downGap = 0;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-45);
    });

    it('should use last gap if down + last gap > down limit', () => {
      const wrapper = { height: 5 };
      const selectedEl = { coords: { down: 50 } };
      const gap = 45;
      const boundedGap = 0;
      const downLimit = 50;
      const downGap = 5;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-50);
    });

    it('should return down selectedEl coords by default', () => {
      const wrapper = { height: 0 };
      const selectedEl = { coords: { down: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const downLimit = 50;
      const downGap = 0;
      calculMarginOnDown(
        wrapper,
        selectedEl,
        gap,
        downLimit,
        boundedGap,
        downGap
      ).should.equal(-10);
    });
  });

  describe('calculMarginOnRight', () => {
    it('should return right selectedEl coords by default', () => {
      const wrapper = { width: 0 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const rightLimit = 50;
      const rightGap = 0;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-10);
    });

    it('should minor wrapper right from selectedEl coords right', () => {
      const wrapper = { width: 5 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const rightLimit = 50;
      const rightGap = 0;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-5);
    });

    it('should add gap from that', () => {
      const wrapper = { width: 5 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 2;
      const boundedGap = 0;
      const rightLimit = 50;
      const rightGap = 0;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-7);
    });

    it('should use boundedGap if gap > rightLimit', () => {
      const wrapper = { width: 5 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 45;
      const boundedGap = 5;
      const rightLimit = 50;
      const rightGap = 0;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-45);
    });

    it('should use right gap if boundedGap does not exist', () => {
      const wrapper = { width: 5 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 45;
      const boundedGap = 0;
      const rightLimit = 50;
      const rightGap = 2;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-45);
    });

    it('should use last gap if down + last gap > down limit', () => {
      const wrapper = { width: 0 };
      const selectedEl = { coords: { right: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const rightLimit = 50;
      const rightGap = 50;
      calculMarginOnRight(
        wrapper,
        selectedEl,
        gap,
        rightLimit,
        boundedGap,
        rightGap
      ).should.equal(-60);
    });
  });

  describe('calculMarginOnLeft', () => {
    it('should return left selectedEl coords by default', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const leftGap = 0;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(
        -10
      );
    });

    it('should minor wrapper left from selectedEl coords left', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 0;
      const boundedGap = 0;
      const leftGap = 0;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(
        -10
      );
    });

    it('should minor gap from that', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 2;
      const boundedGap = 0;
      const leftGap = 0;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(
        -10
      );
    });

    it('should take bounded gap when gap is > to marginLeft', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 20;
      const boundedGap = 2;
      const leftGap = 1;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(-8);
    });

    it('should take left gap when there is no bounded gap', () => {
      const selectedEl = { coords: { left: 10 } };
      const gap = 20;
      const boundedGap = 0;
      const leftGap = 1;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(-9);
    });

    it('should take last gap when there is no left', () => {
      const selectedEl = { left: 10, coords: { left: 10 } };
      const gap = 20;
      const boundedGap = 0;
      const leftGap = 1;
      calculMarginOnLeft(selectedEl, gap, boundedGap, leftGap).should.equal(0);
    });
  });
});
