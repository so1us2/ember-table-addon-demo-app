import Ember from 'ember';
import AccountColumnsMixin from '../mixins/account-columns-mixin';
import ChunkedGroupDataMixin from '../mixins/chunked-group-data-mixin';
import SortQueryMixin from '../mixins/sort-query-mixin';
import TableFeatures from '../mixins/features';

export default Ember.Controller.extend(AccountColumnsMixin, ChunkedGroupDataMixin, SortQueryMixin, TableFeatures, {

  title: 'Error handling for Grouped rows',

  emptyContent: [],

  groupMeta: Ember.computed(function() {
    return this.model();
  }),

  groupingMetadata: [{id: 'accountSection'}, {id: 'accountType'}, {id: 'errorName'}],

  isErrorThrown: Ember.computed(function () {
    return !!this.get('loadError');
  }).property('loadError'),

  errorDescription: Ember.computed.alias('loadError'),
  group: null,
  chunkIndex: null,

  actions: {
    handleDataLoadingError: function (errorMessage, group, chunkIndex) {
      this.set('loadError', errorMessage);
      this.set('group', group);
      this.set('chunkIndex', chunkIndex);
    }
  }

});
