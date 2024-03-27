
from cardsTemplates2.AssociationData import AssociationData
from cardsTemplates2.CategoryData import Category11
from cardsTemplates2.DifferenceData import DifferenceData
from cardsTemplates2.ProportionData import ProportionData11
from cardsTemplates2.TrendData import TrendData11
iniData2 = [

  {
    "CardName": "Card1",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Difference" },
          { "type": "text", "value": " Difference of Total " },
          {
            "type": "entity",
            "value": "Shopping Satisfaction",
            "metadata": { "entityType": "metric_names" },
          },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          # { "type": "text", "value": "From " },
          # {
          #   "type": "entity",
          #   "value": "2012.01.01",
          #   "metadata": { "entityType": "filter_time", "selections": ["2012-01-01"], "paramIndex": 2 },
          # },
          # { "type": "text", "value": " to " },
          # {
          #   "type": "entity",
          #   "value": "2012.12.31",
          #   "metadata": { "entityType": "filter_time", "selections": ["2012-12-31"], "paramIndex": 3 },
          # },
          { "type": "text", "value": "At a " },
          {
            "type": "entity",
            "value": "shopping satisfaction ",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": "of " },
          {
            "type": "entity",
            "value": "5",
            "metadata": {
              "entityType": "metric_value",
            },
          },
          { "type": "text", "value": ", women rate " },
          {
            "type": "entity",
            "value": "94% ",
            "metadata": { "entityType": "binary_value_positive", "assessment": "positive" },
          },
          { "type": "text", "value": " more than men " },

          {
            "type": "entity",
            "value": "(34 → 66) ",
            "metadata": {
              "entityType": "insight",
              "insightType": "TemporalDifference",
              "detail": DifferenceData["data"],
              "tagData": DifferenceData["tagData"],
            },
          },
          # { "type": "text", "value": "from " },
          # {
          #   "type": "entity",
          #   "value": "2011-01-01",
          #   "metadata": { "entityType": "filter_time", "selections": ["2011-01-01"], "paramIndex": 0 },
          # },
          # { "type": "text", "value": " to " },
          # {
          #   "type": "entity",
          #   "value": "2011-12-31",
          #   "metadata": { "entityType": "filter_time", "selections": ["2011-12-31"], "paramIndex": 1 },
          # },
          # { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },

      {
        "type": "plot",
        "chartType": "TemporalDifference",
        "metadata": {
            "x":"Gender",
            "y":"Shopping Satisfaction",
          "detail": DifferenceData["data"],
          "tagData": DifferenceData["tagData"],
        },
      },
      {
        "type": "configuration",
        "chartType": "TemporalDifference",
        "metadata": {
          # "timeSelection": ["2011-01-01", "2011-12-31", "2012-01-01", "2012-12-31"],
        },
      },
    ],
  },
  {
    "CardName": "Card2",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          # { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "CardTitle", "value": "Categorization" },
          { "type": "text", "value": " Rank of " },
          {
            "type": "entity",
            "value": "Shopping Satisfaction",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "Purchase Frequency",
            "metadata": { "entityType": "metric_names", "interactionType": "x-axis" },
          },
          # { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "When looking at " },
          {
            "type": "entity",
            "value": "shopping satisfaction",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "Browsing Frequency",
            "metadata": {
              "entityType": "filter_cate",
              "selections": ["Purchase Frequency", "Browsing Frequency"],
              "interactionType": "x-axis",
              "backEndType": "drillDownGroup",
            },
          },
          { "type": "text", "value": ", there are " },
          {
            "type": "entity",
            "value": "4 ",
            "metadata": { "entityType": "metric_value", "origin": 4 },
          },
          {
            "type": "entity",
            "value": "categories",
            "metadata": {
              "entityType": "insight",
              "insightType": "Categorization",
              "detail": Category11["data"],
              "tagData": -1,
            },
          },
          { "type": "text", "value": ", and the top " },
          {
            "type": "entity",
            "value": "3",
            "metadata": {
              "entityType": "filter_cate",
              "selections": ["3", "4","5"],
              "interactionType": "multiHighlight",
              "backEndType": "topK",
            },
          },
          { "type": "text", "value": " categories are:" },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "show": "yes",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          {
            "type": "entity",
            "value": "Few times a week",
            "metadata": { "entityType": "metric_names", "interactionType": "ByValue" },
          },
          {
            "type": "text",
            "value": ": ",
          },
          # {
          #   "type": 'entity',
          #   "value": '256368.16',
          #   "metadata": { "entityType": 'metric_value', "origin": 256368.16 },
          # },
          {
            "type": "entity",
            "value": "249",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Categorization",
              "detail": Category11["data"],
              "tagData": 0, # 标记第几个数据高亮
              "origin": 249,
              "interactionType": "ByValue",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "show": "yes",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          {
            "type": "entity",
            "value": "Few times a month",
            "metadata": { "entityType": "metric_names", "interactionType": "ByValue" },
          },
          {
            "type": "text",
            "value": ": ",
          },
          # {
          #   "type": 'entity',
          #   "value": '175851.34',
          #   "metadata": { "entityType": 'metric_value', "origin": 175851.34 },
          # },
          {
            "type": "entity",
            "value": "199",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Categorization",
              "detail": Category11["data"],
              "tagData": 1, # 标记第几个数据高亮
              "origin": 199,
              "interactionType": "ByValue",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "show": "yes",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          {
            "type": "entity",
            "value": "Multiple times a day",
            "metadata": { "entityType": "metric_names", "interactionType": "ByValue" },
          },
          {
            "type": "text",
            "value": ": ",
          },
          # {
          #   "type": 'entity',
          #   "value": '120886.95',
          #   "metadata": { "entityType": 'metric_value', "origin": 120886.95 },
          # },
          {
            "type": "entity",
            "value": "77",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Categorization",
              "detail": Category11["data"],
              "tagData": 2, # 标记第几个数据高亮
              "origin": 77,
              "interactionType": "ByValue",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "show": "no",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          {
            "type": "entity",
            "value": "Rarely",
            "metadata": { "entityType": "metric_names", "interactionType": "ByValue" },
          },
          {
            "type": "text",
            "value": ": ",
          },
          # {
          #   "type": 'entity',
          #   "value": '120886.95',
          #   "metadata": { "entityType": 'metric_value', "origin": 120886.95 },
          # },
          {
            "type": "entity",
            "value": "77",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Categorization",
              "detail": Category11["data"],
              "tagData": 3, # 标记第几个数据高亮
              "origin": 77,
              "interactionType": "ByValue",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "show": "no",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          {
            "type": "entity",
            "value": "San Francisco",
            "metadata": { "entityType": "metric_names", "interactionType": "ByValue" },
          },
          {
            "type": "text",
            "value": ": ",
          },
          # {
          #   "type": 'entity',
          #   "value": '120886.95',
          #   "metadata": { "entityType": 'metric_value', "origin": 120886.95 },
          # },
          {
            "type": "entity",
            "value": "112669.092",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Categorization",
              "detail": Category11["data"],
              "tagData": 4, # 标记第几个数据高亮
              "origin": 119540.742,
              "interactionType": "ByValue",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "plot",
        "chartType": "Categorization",
        "metadata": {
            "x":"Shopping Satisfaction",
            "y":"Browsing Frequency",
          "detail": Category11["data"],
        },
      },
      {
        "type": "configuration",
        "chartType": "Categorization",
        "metadata": {
          "drillDownGroup": "Purchase Frequency",
          "topK": "3",
        },
      },
    ],
  },
  {
    "CardName": "Card3",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Proportion" },
          { "type": "text", "value": " Proportion of " },
          {
            "type": "entity",
            "value": "Good Shopping Satisfaction",
            "metadata": { "entityType": "metric_names" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "Gender",
            "metadata": { "entityType": "metric_names" },
          },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          # { "type": "text", "value": "From " },
          # {
          #   "type": "entity",
          #   "value": "January 1, 2011",
          #   "metadata": { "entityType": "filter_time", "selections": ["2011-01-01"], "paramIndex": 0 },
          # },
          # { "type": "text", "value": " to " },
          # {
          #   "type": "entity",
          #   "value": "December 31, 2014",
          #   "metadata": { "entityType": "filter_time", "selections": ["2014-12-31"], "paramIndex": 1 },
          # },
          {
            "type": "text",
            "value": "When looking at the proprtion of ",
          },
          {
            "type": "entity",
            "value": "good shopping",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " satisfaction by ",
          },
          {
            "type": "entity",
            "value": "gender",
            "metadata": {
              "entityType": "filter_cate",
              "selections": ["gender", "product", "improvement areas"],
              "backEndType": "drillDownGroup",
            },
          },
          {
            "type": "text",
            "value": ", the specific proportions of good shopping ",
          },
          # {
          #   "type": "entity",
          #   "value": "sales",
          #   "metadata": { "entityType": "metric_names" },
          # },
          {
            "type": "text",
            "value": "volume are as follows:",
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          {
            "type": "entity",
            "value": "Female",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " ranks first, with a proportion of ",
          },

          {
            "type": "entity",
            "value": "58.7%",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Proportion",
              "origin": 0.587,
              "detail": [0.587, 1 - 0.587],
            },
          },

          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          {
            "type": "entity",
            "value": "Male",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " takes the second position, with a proportion of ",
          },

          {
            "type": "entity",
            "value": "19.5%",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Proportion",
              "origin": 0.195,
              "detail": [0.195, 1 - 0.195],
            },
          },
          # {
          #   "type": "entity",
          #   "value": "",
          #   "metadata": {
          #     "entityType": "insight",
          #     "insightType": "Proportion",
          #     "origin": 0.0732,
          #     "detail": [0.0732, 1 - 0.0732],
          #   },
          # },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "plot",
        "chartType": "Proportion",
        "metadata": {
             "x":"Shopping Satisfaction",
            "y":"Browsing Frequency",
          "detail": ProportionData11["data"],
        },
      },
      {
        "type": "configuration",
        "chartType": "Proportion",
        "metadata": {
          "drillDownGroup": "gender",
        },
      },
    ],
  },
  {
    "CardName": "Card4",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Temporal Trend" },
          { "type": "text", "value": " Trend of " },
          {
            "type": "entity",
            "value": "Purchase Frequency",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
        ],
      },
      
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "In the past " },
          {
            "type": "entity",
            "value": "7 days",
            "metadata": {
              "entityType": "filter_cate",
              "selections": ["7 days", "30 days", "365 days"],
              "backEndType": "timeSegmentationCondition",
            },
          },
          { "type": "text", "value": ", there is an " },

          {
            "type": "entity",
            "value": "increased",
            "metadata": {
              "entityType": "binary_value_positive",
              "insightType": "TemporalityTrend",
              "detail": TrendData11["data"],
              "tagData": TrendData11["predictData"] ,
              "assessment": "increase",
            },
          },
          { "type": "text", "value": " trend in " },
          {
            "type": "entity",
            "value": "purchase frequency.",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "According to " },
          {
            "type": "entity",
            "value": "PROPHET algorithm",
            "metadata": {
              "entityType": "algorithm",
              "origin":
                "The Prophet Algorithm is an open-source forecasting algorithm used for time series prediction. Its working principle is based on decom" +
                "posing time series data into a combination of trend, seasonality, and holiday effects. By adding these components together, it can generate forecasts for future time points.",
            },
          },
          { "type": "text", "value": ", the trend will be " },
          {
            "type": "entity",
            "value": "increasing",
            "metadata": {
              "entityType": "binary_value_positive",
              "assessment": "increase",
              "interactionType": "Temporal Trend Regression",
            },
          },
          { "type": "text", "value": " with a predicted value of " },
          {
            "type": "entity",
            "value": "54 ",
            "metadata": { "entityType": "metric_value", "origin": 54, "interactionType": "ByValue" },
          },
          { "type": "text", "value": "until " },
          {
            "type": "entity",
            "value": "June 17, 2023",
            "metadata": {
              "entityType": "filter_time",
              "selections": ["2023-06-17"],
              "paramIndex": 0,
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "plot",
        "chartType": "TemporalTrend",
        "metadata": {
             "x":"Date",
            "y":"Purchase of Frequency",
          "detail": TrendData11["data"]+TrendData11["predictData"] ,
          "tagData": TrendData11["tagData"] ,
        },
      },
      {
        "type": "configuration",
        "chartType": "TemporalTrend",
        "metadata": {
          "timeSelection": ["2023-06-17"],
          "timeSegmentationCondition": "7 days",
        },
      },
    ],
  },
  {
    "CardName": "Card5",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Association" },
          { "type": "text", "value": " Association Between " },
          {
            "type": "entity",
            "value": "Shopping Satisfaction",
            "metadata": { "entityType": "metric_names", "interactionType": "x-axis" },
          },
          { "type": "text", "value": " and " },
          {
            "type": "entity",
            "value": "Personalized Recommendation Frequency",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          { "type": "text", "value": "According to the " },
          {
            "type": "entity",
            "value": "Pearson correlation analysis",
            "metadata": {
              "entityType": "algorithm",
              "origin":
                "The Pearson correlation coefficient measures the strength and direction of the linear relationship between two variables. The coefficient's values range from -1 to 1. When the correlation coefficient is equal to 1" +
                ", it indicates a perfect positive linear relationship between the two variables, meaning that an increase in one variable is always accompanied by an increase in the other, and vice versa.",
            },
          },
          { "type": "text", "value": ", the coefficient between " },
          {
            "type": "entity",
            "value": "shopping satisfaction",
            "metadata": { "entityType": "metric_names", "interactionType": "x-axis" },
          },
          { "type": "text", "value": " and " },
          {
            "type": "entity",
            "value": "personalized recommendation frequency",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": " equals " },
          {
            "type": "entity",
            "value": "0.98",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Association",
              "detail": AssociationData["data"],
              "tagData": AssociationData["tagData"],
              "interactionType": "Association Regression",
            },
          },
          { "type": "text", "value": ", indicating a " },
          {
            "type": "entity",
            "value": "positive",
            "metadata": { "entityType": "binary_value_positive", "assessment": "positive" },
          },
          { "type": "text", "value": " relationship. Besides, the correlation is statistically " },
          {
            "type": "entity",
            "value": "significant",
            "metadata": {
              "entityType": "binary_value_positive",
              "assessment": "significant",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "plot",
        "chartType": "Association",
        "metadata": {
            "x":"Shopping Satisfaction",
            "y":"Personalized Recommendation Frequency",
          "detail": AssociationData["data"],
          "tagData": AssociationData["tagData"],
        },
      },
      {
        "type": "configuration",
        "chartType": "Association",
        "metadata": {},
      },
    ],
  },
  
 ]
