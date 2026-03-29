import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import FormBuilder from '@george-gillams/components/form-builder';
import { EVENT_TYPE as SPARTAN_EVENT_TYPE } from '@george-gillams/components/spartan-medal';
import { PATCH_TYPE as TM_PATCH_TYPE } from '@george-gillams/components/tough-mudder-patch';

import { SECTION_LABELS, SECTION_ORDER } from 'helpers/medalsSections';

const sectionOptions = SECTION_ORDER.map(id => ({
  value: id,
  name: SECTION_LABELS[id],
}));

const spartanTypeOptions = Object.values(SPARTAN_EVENT_TYPE).map(v => ({
  value: v,
  name: v,
}));

const tmPatchTypeOptions = Object.values(TM_PATCH_TYPE).map(v => ({
  value: v,
  name: v,
}));

const getFormFields = section => {
  const common = [
    {
      id: 'section',
      name: 'Section',
      type: 'SELECT',
      options: sectionOptions,
    },
    {
      id: 'year',
      name: 'Year',
    },
    {
      id: 'eventDate',
      name: 'Event date (YYYY-MM-DD, optional — used for sorting)',
    },
    {
      id: 'stravaId',
      name: 'Strava activity id',
    },
  ];

  if (!section) {
    return common;
  }

  if (section === 'spartan') {
    return [
      ...common,
      {
        id: 'spartanType',
        name: 'Spartan type',
        type: 'SELECT',
        options: spartanTypeOptions,
      },
    ];
  }

  if (section === 'toughMudder') {
    return [
      ...common,
      {
        id: 'tmPatchType',
        name: 'Tough Mudder patch type',
        type: 'SELECT',
        options: tmPatchTypeOptions,
      },
    ];
  }

  if (section === 'hyrox') {
    return [
      ...common,
      {
        id: 'title',
        name: 'Title',
      },
    ];
  }

  // otherOcr, running, treks
  return [
    ...common,
    {
      id: 'title',
      name: 'Title',
    },
    {
      id: 'background',
      name: 'Background colour (CSS)',
    },
    {
      id: 'foreground',
      name: 'Foreground colour (CSS)',
    },
    {
      id: 'showDarkModeOutline',
      name: 'Dark mode outline',
      type: 'CHECKBOX',
    },
  ];
};

const MedalEditForm = props => {
  const { medal, onSubmit, submitLabel, ...rest } = props;

  const [editedMedal, setEditedMedal] = useState(medal);

  useEffect(() => {
    setEditedMedal(medal);
  }, [medal]);

  const formFields = useMemo(() => getFormFields(editedMedal?.section), [editedMedal?.section]);

  return (
    <FormBuilder
      test={process.env.NODE_ENV === 'test'}
      formFields={formFields}
      entity={editedMedal}
      onDataChanged={m => setEditedMedal(m)}
      onSubmit={() => onSubmit(editedMedal)}
      submitLabel={submitLabel}
      {...rest}
    />
  );
};

MedalEditForm.propTypes = {
  medal: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
};

export default MedalEditForm;
