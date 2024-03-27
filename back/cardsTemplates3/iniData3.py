
from cardsTemplates3.AssociationData import AssociationData
from cardsTemplates3.CategoryData import Category11
from cardsTemplates3.DifferenceData import DifferenceData
from cardsTemplates3.ProportionData import ProportionData11
from cardsTemplates3.TrendData import TrendData11
from cardsTemplates3.DistributionData import DistributionData
iniData3 = [
  {
    "CardName": "Card1",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Difference" },
          { "type": "text", "value": " Difference of " },
          {
            "type": "entity",
            "value": "Sales of Shopping Mall 1",
            "metadata": { "entityType": "metric_names" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "Year",
            "metadata": { "entityType": "metric_names" },
          },
        ],
      },
      {
        "type": "normal",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "From " },
          {
            "type": "entity",
            "value": "2012.01.01",
            "metadata": { "entityType": "filter_time", "selections": ["2012-01-01"], "paramIndex": 2 },
          },
          { "type": "text", "value": "to " },
          {
            "type": "entity",
            "value": "2012.12.31",
            "metadata": { "entityType": "filter_time", "selections": ["2012-12-31"], "paramIndex": 3 },
          },
          { "type": "text", "value": ", total " },
          {
            "type": "entity",
            "value": "profit ",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          {
            "type": "entity",
            "value": "increased ",
            "metadata": { "entityType": "binary_value_positive", "assessment": "increase" },
          },
          { "type": "text", "value": "by " },
          {
            "type": "entity",
            "value": "121.83% ",
            "metadata": { "entityType": "binary_value_positive", "assessment": "positive" },
          },
          {
            "type": "entity",
            "value": "(1418042 → 1727563.46) ",
            "metadata": {
              "entityType": "insight",
              "insightType": "TemporalDifference",
              "detail": DifferenceData["data"],
              "tagData": DifferenceData["tagData"],
            },
          },
          { "type": "text", "value": "from " },
          {
            "type": "entity",
            "value": "2011-01-01",
            "metadata": { "entityType": "filter_time", "selections": ["2011-01-01"], "paramIndex": 0 },
          },
          { "type": "text", "value": "to " },
          {
            "type": "entity",
            "value": "2011-12-31",
            "metadata": { "entityType": "filter_time", "selections": ["2011-12-31"], "paramIndex": 1 },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },

      {
        "type": "plot",
        "chartType": "TemporalDifference",
        "metadata": {
            "x":"Year",
            "y":"Profit",
          "detail": DifferenceData["data"],
          "tagData": DifferenceData["tagData"],
        },
      },
      {
        "type": "configuration",
        "chartType": "TemporalDifference",
        "metadata": {
          "timeSelection": ["2011-01-01", "2011-12-31", "2012-01-01", "2012-12-31"],
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
            "value": "Sales of Shopping Mall",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "Temperature",
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
            "value": "sales of shopping mall 5 ",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "Temperature",
            "metadata": {
              "entityType": "filter_cate",
              "selections": ["Temperature", "CPI"],
              "interactionType": "x-axis",
              "backEndType": "drillDownGroup",
            },
          },
          { "type": "text", "value": ", there are " },
          {
            "type": "entity",
            "value": "5 ",
            "metadata": { "entityType": "metric_value", "origin": 5 },
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
            "value": "Cold",
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
            "value": "4725760.07",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Categorization",
              "detail": Category11["data"],
              "tagData": 0, # 标记第几个数据高亮
              "origin": 4725760.07,
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
            "value": "Warm",
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
            "value": "2334360.78",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Categorization",
              "detail": Category11["data"],
              "tagData": 1, # 标记第几个数据高亮
              "origin": 2334360.78,
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
            "value": "Mild",
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
            "value": "2145639.35",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Categorization",
              "detail": Category11["data"],
              "tagData": 2, # 标记第几个数据高亮
              "origin": 2145639.35,
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
            "value": "Sales of Store",
            "metadata": { "entityType": "metric_names" },
          },
          { "type": "text", "value": " by " },
          {
            "type": "entity",
            "value": "Shopping Mall ",
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
            "value": "sales of store",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " by ",
          },
          {
            "type": "entity",
            "value": "shopping mall 1",
            "metadata": {
              "entityType": "filter_cate",
              "selections": ["shopping mall 1", "shopping mall 2", "shopping mall 3", "shopping mall 4"],
              "backEndType": "drillDownGroup",
            },
          },
          {
            "type": "text",
            "value": ", the specific proportions are as follows:",
          },
          # {
          #   "type": "entity",
          #   "value": "sales",
          #   "metadata": { "entityType": "metric_names" },
          # },
          # {
          #   "type": "text",
          #   "value": "volume are as follows:",
          # },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          {
            "type": "entity",
            "value": "Store13",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " ranks first, with a proportion of ",
          },

          {
            "type": "entity",
            "value": "4.16%",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Proportion",
              "origin": 0.0416,
              "detail": [0.0416, 1 - 0.0416],
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
            "value": "Store14",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " ranks second, with a proportion of ",
          },

          {
            "type": "entity",
            "value": "4.16%",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Proportion",
              "origin": 0.0416,
              "detail": [0.0416, 1 - 0.0416],
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
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },

          {
            "type": "entity",
            "value": "Store27",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": " ranks third, with a proportion of ",
          },

          {
            "type": "entity",
            "value": "4.09%",
            "metadata": {
              "entityType": "metric_value",
              "insightType": "Proportion",
              "origin": 0.0409,
              "detail": [0.0409, 1 - 0.0409],
            },
          },
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
            "value": "Sales of Shopping Mall 1",
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
              "selections": ["365 days", "30 days","7 days" ],
              "backEndType": "timeSegmentationCondition",
            },
          },
          { "type": "text", "value": ", there is an " },

          {
            "type": "entity",
            "value": "decreasing",
            "metadata": {
              "entityType": "binary_value_negative",
              "insightType": "TemporalityTrend",
              "detail": TrendData11["data"],
              "tagData": TrendData11["predictData"] ,
              "assessment": "decrease",
            },
          },
          { "type": "text", "value": " trend in " },
          {
            "type": "entity",
            "value": "sales of shopping mall 1.",
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
          { "type": "text", "value": " With a predicted value of " },
          {
            "type": "entity",
            "value": "375988 ",
            "metadata": { "entityType": "metric_value", "origin": 375988, "interactionType": "ByValue" },
          },
          { "type": "text", "value": "until " },
          {
            "type": "entity",
            "value": "June 30, 2013",
            "metadata": {
              "entityType": "filter_time",
              "selections": ["2013-06-30"],
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
            "y":"Sales",
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
            "value": "Unemployment",
            "metadata": { "entityType": "metric_names", "interactionType": "x-axis" },
          },
          { "type": "text", "value": " and " },
          {
            "type": "entity",
            "value": "CPI",
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
            "value": "unemployment",
            "metadata": { "entityType": "metric_names", "interactionType": "x-axis" },
          },
          { "type": "text", "value": " and " },
          {
            "type": "entity",
            "value": "CPI",
            "metadata": { "entityType": "metric_names", "interactionType": "y-axis" },
          },
          { "type": "text", "value": " equals " },
          {
            "type": "entity",
            "value": "-0.3",
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
            "value": "negative",
            "metadata": { "entityType": "binary_value_negative", "assessment": "negative" },
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
            "x":"Unemployment",
            "y":"CPI",
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
  {
    "CardName": "Card6",
    "paragraph": [
      {
        "type": "topic",
        "phrases": [
          { "type": "CardTitle", "value": "Distribution" },
          { "type": "text", "value": " Distribution of " },
          {
            "type": "entity",
            "value": "Sales of Shopping Mall 1",
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
          #   "value": "January 01, 2011",
          #   "metadata": {
          #     "entityType": "filter_time",
          #     "selections": ["2011-01-01"],
          #     "paramIndex": 0,
          #   },
          # },
          # { "type": "text", "value": " to " },
          # {
          #   "type": "entity",
          #   "value": "December 31, 2014",
          #   "metadata": {
          #     "entityType": "filter_time",
          #     "selections": ["2014-12-31"],
          #     "paramIndex": 1,
          #   },
          # },
          {
            "type": "text",
            "value": "The distribution of ",
          },
          {
            "type": "entity",
            "value": " sales of shopping mall 1 ",
            "metadata": { "entityType": "metric_names" },
          },
          {
            "type": "text",
            "value": "is ",
          },
          
          {
            "type": "entity",
            "value": " left-skewed ",
            "metadata": {
              "entityType": "binary_value_positive",
              "insightType": "Distribution",
              "detail": DistributionData["data"],
              "assessment":"left-skewed"
            },
          },
          {
            "type": "text",
            "value": "Most data points lie in the range of ",
          },
          {
            "type": "entity",
            "value": "104790",
            "metadata": { "entityType": "metric_value", "origin": 104790 },
          },
          {
            "type": "text",
            "value": " - ",
          },
          {
            "type": "entity",
            "value": "336814",
            "metadata": { "entityType": "metric_value", "origin": 336814 },
          },
          {
            "type": "text",
            "value": ", ",
          },
          {
            "type": "entity",
            "value": "4",
            "metadata": {
              "entityType": "metric_value",
              "origin": 4,
              "interactionType": "distribution Outliers",
              "assessment": "anomaly"
            },
          },
          { "type": "text", "value": " outliers have been identified, with " },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "Min = " },
          {
            "type": "entity",
            "value": "5142.08",
            "metadata": {
              "entityType": "metric_value",
              "origin": 5142.08,
              "interactionType": "distribution Min",
            },
          },
          { "type": "text", "value": " , Max = " },
          {
            "type": "entity",
            "value": "2198599.96",
            "metadata": {
              "entityType": "metric_value",
              "origin": 2198599.96,
              "interactionType": "distribution Max",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      {
        "type": "bullet",
        "phrases": [
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
          { "type": "text", "value": "Q1 = " },
          {
            "type": "entity",
            "value": "104790.53",
            "metadata": {
              "entityType": "metric_value",
              "origin": 104790.53,
              "interactionType": "distribution Q1",
            },
          },
          { "type": "text", "value": " , Q2 (Median) = " },
          {
            "type": "entity",
            "value": "209749.72",
            "metadata": {
              "entityType": "metric_value",
              "origin": 209749.72,
              "interactionType": "distribution Median",
            },
          },
          { "type": "text", "value": " , Q3 = " },
          {
            "type": "entity",
            "value": "336814.32",
            "metadata": {
              "entityType": "metric_value",
              "origin": 336814.32,
              "interactionType": "distribution Q3",
            },
          },
          { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
        ],
      },
      # {
      #   "type": "bullet",
      #   "phrases": [
      #     { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceStart" } },
      #     { "type": "text", "value": "Mean = " },
      #     {
      #       "type": "entity",
      #       "value": "8840.91",
      #       "metadata": { "entityType": "metric_value", "origin": 8840.91 },
      #     },
      #     { "type": "text", "value": " , Standard deviation = " },
          
      #     {
      #       "type": "entity",
      #       "value": "6567.82",
      #       "metadata": {
      #         "entityType": "insight",
      #         "insightType": "Distribution",
      #         "detail": DistributionData["data"],
      #       },
      #     },
      #     { "type": "IconPadding", "value": "", "metadata": { "entityType": "sentenceEnd" } },
      #   ],
      # },

      {
        "type": "plot",
        "chartType": "Distribution",
        "metadata": {
            "x": "Sales",
          "y": "Profit",
          "detail": DistributionData["data"],
        },
      },
      {
        "type": "configuration",
        "chartType": "Distribution",
        "metadata": {
          "timeSelection": ["2011-01-01", "2014-12-31"],
        },
      },
    ],
  },  
 ]
