# Version 1.0

Generate data combining two (or more) patterns.

**How to create a pattern?**

> A pattern is a special spatial distribution of the data points when plotted gives a visual clue. In patternify, the pattern is specified in the JSON format. This can be made highly configurable using an exhaustive list of attributes mentioned [here](#attributeList). Lets have an example to illustrate the fact.

Sam has a shopping mall. During the past years he has been observing the following trends.
-  > Sales in a week sees sharp increase Friday night onwards, loses its momentum on saturdays and finally reaches its peak on Sundays. There remains a dip on Tuesdays and Thursdays.
- > On a yearly cycle, sales are high on May-June(summer vaccations), October(puja vaccations) and reaches its peak with Christmas holidays.

So, he wants to create a realistic demo of his buisness growth in the coming 2 years. But he needs data to even plot them in charting softwares.

And there he is.... He creates the following custom patterns:

```sh
{
    'id': 'weekly',
    'data': '30|20|50|30|70(0,1)95',
    'dataSeperator': '|',
    'dataInsertor': '()'
}
```
> **Note:** (0,1) refers to put the sales value of Saturday closer to that of Sunday
```sh
{
    'id': 'yearly',
    'data': '20(98)40(49)50(70)35(79)55(49)75(14)95',
    'max': 100,
    'min': 20
}
```
Now as the patterns are already determined, he generates the required data, defining these two patterns:

```sh
{
    'maxValue': 3000,
    'minValue': 0,
    'numDecimal': 0,
    'patterns': [{
        'id': 'weekly',
        'data': '30|20|50|30|70(0,1)95',
        'dataSeperator': '|',
        'dataInsertor': '()'
    },{
        'id': 'yearly',
        'data': '20(98)40(49)50(70)35(79)55(49)75(14)95',
        'max': 100,
        'min': 20
    }],
    'data': 0('yearly+weekly',364)1400('yearly+weekly',364)3000,
    'patternSeperator': '|',
    'patternInsertor': '()'
}
```
<a name="attributeList">**Supported Attributes**</a>

- numDecimal
    - The maximum number of decimals allowed in the data.
    - _Default Value_ (***Number***): 2
- maxValue
    - The actual maximum limit for the entire data.
    - _Default Value_ (***Number***): Last value of the *data* attribute.
- minValue
    - The actual minimum limit for the entire data.
    - _Default Value_ (***Number***): Starting value of the *data* attribute.
- patterns
    - Defines the list of patterns to be used in the data.Its an array collection of the pattern objects
    - _Default Value_ (***Array***): Straight line.
- data
    - Raw data to generate the data.
    - _Default Value_ (***String***): Null.
- patternSeperator
    - A string to differentiate two patterns in the data genration definition.
    - _Default Value_ (***String***): '|'
- patternInsertor
    - A string to insert a pattern between two patterns in the data genration definition.
    - The pattern comes as its first argument and thereby follows the distribution of in-between points as its next paramenter e.g. (<final pattern>, <points distribution>)
    - _Default Value_ (***String***): '()'

**Pattern specific attributes**

- id
    - Uniquely identify the pattern.
    - _Default Value_ (***String***) : pattern serial index.
- maxValue
    - The upper limit for the scale to be used in pattern definition.
    - _Default Value_ (***Number***): 100
- minValue
    - The lower limit for the scale to be used in pattern definition.
    - _Default Value_ (***Number***): 0
- numDecimal
    - The maximum number of decimals allowed in pattern definition.
    - _Default Value_ (***Number***): 2
- dataSeperator
    - A string to differentiate two data points in the pattern definition.
    - _Default Value_ (***String***): '|'
- dataInsertor
    - A string to insert more data between the two data points in the pattern definition. The insertion may not be uniform and the non-uniformity is speciified using comma speciified values.
    - _Default Value_ (***String***): '()'
    - e.g. -
```sh
    20(50)30 -  Insert 50 datapoints between datapoints 20 and 30 respectively.
    20(20,30,0)30 -  Divide the region 20 - 30 in three parts. Insert 20 and 30 datapoints in the first two parts and leave the third untouched without adding any single element.
    20(10:50)30 -  Insert random number within 10 and 50 of datapoints between the  datapoints 20 and 30 respectively.Useful for randomised insertions.
```
- data
    - Enter the data points in the format shown above to create a pattern out of it.
    - *Default Value*: Null.