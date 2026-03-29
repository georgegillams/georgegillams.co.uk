import Section from '@george-gillams/components/section';
import Subsection from '@george-gillams/components/subsection';
import PageTitle from 'components/common/PageTitle';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { withScrollAnimation } from '@george-gillams/components/effects';
import EventPatch from '@george-gillams/components/event-patch';
import SpartanMedal from '@george-gillams/components/spartan-medal';
import ToughMudderPatch from '@george-gillams/components/tough-mudder-patch';
import LoadingCover from '@george-gillams/components/loading-cover';
import { BUTTON_TYPES } from '@george-gillams/components/button/constants';

import PageContainer from 'components/common/PageContainer';
import Button from 'components/common/Button';
import MedalEditForm from 'components/Medals/MedalEditForm';
import { SECTION_LABELS, SECTION_ORDER } from './constants';
import { AdminMedalActions, AdminMedalBlock, StyledMedalShelf } from './container.styles';
import MedalsSkeleton from './MedalsSkeleton';

const SectionWithScroll = withScrollAnimation(Section);
const HYROX_YELLOW = '#ffed00';

const stravaLinkFor = medal =>
  medal.stravaId ? `https://www.strava.com/activities/${medal.stravaId}` : undefined;

const Medals = props => {
  const { ssrMedals, loadMedals, createMedal, updateMedal, deleteMedal, authenticatorState, medalsState } = props;

  const [editingMedalId, setEditingMedalId] = useState(null);

  useEffect(() => {
    loadMedals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const admin = authenticatorState.user && authenticatorState.user.admin;

  let medalsToRender = medalsState?.medals || ssrMedals;

  const renderMedalGraphic = medal => {
    const stravaLink = stravaLinkFor(medal);

    switch (medal.section) {
      case 'spartan':
        return (
          <SpartanMedal
            type={medal.spartanType}
            // @ts-expect-error year type is not correct in the component
            year={medal.year}
            stravaLink={stravaLink}
          />
        );
      case 'hyrox':
        return (
          <EventPatch
            background="#000000"
            foreground={HYROX_YELLOW}
            title={medal.title}
            year={medal.year}
            stravaLink={stravaLink}
            showDarkModeOutline
          />
        );
      case 'otherOcr':
      case 'running':
      case 'treks':
        return (
          <EventPatch
            background={medal.background}
            foreground={medal.foreground}
            title={medal.title}
            year={medal.year}
            stravaLink={stravaLink}
            showDarkModeOutline={medal.showDarkModeOutline}
          />
        );
      case 'toughMudder':
        return (
          <ToughMudderPatch
            type={medal.tmPatchType}
            year={medal.year}
            stravaLink={stravaLink}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer bottomPadding>
      {/* @ts-expect-error PageTitle not yet typed */}
      <PageTitle anchor={false} name="Races"></PageTitle>
      <LoadingCover
        loadingSkeleton={MedalsSkeleton}
        loading={!medalsToRender}
        error={!!medalsState?.loadMedalsError}>
        <>
          {medalsToRender &&
            SECTION_ORDER.map(sectionId => {
              const inSection = medalsToRender.filter(m => m.section === sectionId);
              if (inSection.length === 0) {
                return null;
              }

              return (
                <SectionWithScroll key={sectionId} name={SECTION_LABELS[sectionId]}>
                  <Subsection>
                    <StyledMedalShelf>
                      {inSection.map(medal => (
                        <AdminMedalBlock key={medal.id}>
                          <div style={{ opacity: medal.deleted ? 0.45 : 1 }}>{renderMedalGraphic(medal)}</div>
                          {admin && (
                            <>
                              <AdminMedalActions>
                                <Button
                                  onClick={() =>
                                    setEditingMedalId(editingMedalId === medal.id ? null : medal.id)
                                  }>
                                  {editingMedalId === medal.id ? 'Cancel' : 'Edit'}
                                </Button>
                                <Button
                                  buttonType={BUTTON_TYPES.destructive}
                                  onClick={() => deleteMedal(medal.id)}
                                  disabled={!!medal.deleted}>
                                  Delete
                                </Button>
                              </AdminMedalActions>
                              {editingMedalId === medal.id && !medal.deleted && (
                                <MedalEditForm
                                  medal={medal}
                                  onSubmit={m => {
                                    updateMedal(m);
                                    setEditingMedalId(null);
                                  }}
                                  submitLabel="Save medal"
                                />
                              )}
                            </>
                          )}
                        </AdminMedalBlock>
                      ))}
                    </StyledMedalShelf>
                  </Subsection>
                </SectionWithScroll>
              );
            })}
          {admin && medalsToRender && (
            <SectionWithScroll name="Create new medal">
              <Subsection>
                <MedalEditForm
                  medal={{ section: 'spartan' }}
                  onSubmit={m => createMedal(m)}
                  submitLabel="Create medal"
                />
              </Subsection>
            </SectionWithScroll>
          )}
        </>
      </LoadingCover>
    </PageContainer>
  );
};

Medals.propTypes = {
  ssrMedals: PropTypes.arrayOf(PropTypes.object),
  loadMedals: PropTypes.func.isRequired,
  createMedal: PropTypes.func.isRequired,
  updateMedal: PropTypes.func.isRequired,
  deleteMedal: PropTypes.func.isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  medalsState: PropTypes.shape({
    medals: PropTypes.arrayOf(PropTypes.object),
    loadMedalsError: PropTypes.object,
  }),
};

Medals.defaultProps = {
  ssrMedals: null,
  medalsState: null,
};

export default Medals;
