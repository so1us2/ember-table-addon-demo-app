import Ember from 'ember';
import TableFeatures from '../mixins/features';
import TreeDataGridMixin from '../mixins/tree-data-grid';

export default Ember.Controller.extend(TableFeatures, TreeDataGridMixin, {
  tableContent: [],
  title: "Style Customization",
  features: [
    {
      name: 'Column Group Headers',
      icon: 'fa-flash'
    },
    {
      name: 'Sorting Indicator',
      icon: 'fa-arrows-v'
    },
    {
      name: 'Group Row Indicator',
      icon: 'fa-sort'
    }
  ],

  styleParts: Ember.computed(function () {
    var self = this;
    var StylePart = Ember.Object.extend({
      selectedStyle: null,
      partName: null,
      selectedStyleDidChange: Ember.observer('selectedStyle', function () {
        var partName = this.get('partName');
        var selectedStyle = this.get('selectedStyle');
        Ember.run(function () {
          self.get('columns').forEach(function (c) {
            Ember.set(c, partName, selectedStyle);

          });
        });
      })
    });
    return [
      StylePart.create({
        title: 'First Inner Column',
        partName: 'firstColumnStyle'
      }),
      StylePart.create({
        title: 'All Inner Columns',
        partName: 'innerColumnStyle'
      }),
      StylePart.create({
        title: 'Last Inner Column',
        partName: 'lastColumnStyle'
      }),
      StylePart.create({
        title: 'Grouping Cells',
        partName: 'cellStyle' //apply to grouping header cell only
      })
    ];
  }),

  styleOptions: [
    {
      title: 'Text in red',
      id: 'text-red'
    },
    {
      title: 'Text in blue',
      id: 'text-blue'
    },
    {
      title: 'Text center',
      id: 'text-center'
    },
    {
      title: 'Background gray',
      id: 'bg-gray'
    },
    {
      title: 'Background light gray',
      id: 'bg-lightgray'
    }
  ],

  sortingIndicatorOptions: [
    {
      title: 'Text Indicator',
      id: 'custom-column-sort-indicator'
    }
  ],

  groupIndicatorOptions: [
    {
      title: 'With Level',
      id: 'grouped-row-indicator-with-level'
    }
  ],

  groupIndicatorWidth: Ember.computed(function () {
    var view = this.get('selectedGroupIndicatorViewName');
    return view ? 25 : 10;
  }).property('selectedGroupIndicatorViewName'),

  loadingIndicatorOptions: [
    {
      title: 'Custom background',
      id: 'custom-row-loading-indicator'
    }
  ]
});
