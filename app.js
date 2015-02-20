var dataMap = {
  'Today': 'TODAY', 
  'Yesterday': 'YESTERDAY', 
  'Last 7 Days': 'LAST_7_DAYS', 
  'Last Week': 'LAST_WEEK', 
  'Last 2 weeks': 'LAST_14_DAYS', 
  'Last 30 days': 'LAST_30_DAYS', 
  'Last Business week': 'LAST_BUSINESS_WEEK', 
  'This Month': 'THIS_MONTH', 
  'Last Month': 'LAST_MONTH', 
  'All time': 'ALL_TIME'
};

var keywords_date = 'LAST_30_DAYS',
    stats_date = 'LAST_30_DAYS'

$(document).ready(function(){
  updateScript()
  $('#keywords-date').on('change', function() {
    var that = $(this).val();
    keywords_date = dataMap[that]
    console.log(keywords_date)
    updateScript()
    // alert( this.value ); // or $(this).val()
  });
  $('#stats-date').on('change', function() {
    var that = $(this).val();
    stats_date = dataMap[that]
    console.log(stats_date)
    updateScript()
    // alert( this.value ); // or $(this).val()
  });

  function updateScript(){
    var script = "<div>&nbsp;&nbsp;function&nbsp;main()&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;function&nbsp;getKeywordStats()&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;keywordIterator&nbsp;=&nbsp;AdWordsApp.keywords().forDateRange(<font color='#2a00ff'>'"+keywords_date+"'</font>).withCondition(<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#2a00ff'>'Impressions&nbsp;>&nbsp;0'</font>).get();<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><font color='#7f0055'>while</font></strong>&nbsp;(keywordIterator.hasNext())&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logger.log(oldMaxCPC&nbsp;+&nbsp;<font color='#2a00ff'>',&nbsp;'</font>&nbsp;+&nbsp;NewMaxCPC)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;keyword&nbsp;=&nbsp;keywordIterator.next();<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;stats&nbsp;=&nbsp;keyword.getStatsFor(<font color='#2a00ff'>'"+stats_date+"'</font>);<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;oldMaxCPC&nbsp;=&nbsp;keyword.getMaxCpc()<br/><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><font color='#7f0055'>if</font></strong>&nbsp;(stats.getConvertedClicks()&nbsp;===&nbsp;0&nbsp;||&nbsp;(stats.getCost()/stats.getConvertedClicks())&nbsp;===&nbsp;0)&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;NewMaxCPC&nbsp;=&nbsp;oldMaxCPC<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><font color='#7f0055'>else</font></strong>&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;NewMaxCPC&nbsp;=&nbsp;(stats.getAverageCpc()/(stats.getCost()/stats.getConvertedClicks()))*10<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><font color='#7f0055'>if</font></strong>&nbsp;(!isNaN(NewMaxCPC))&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;keyword.setMaxCpc(NewMaxCPC)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;&nbsp;&nbsp;getKeywordStats()<br/>&nbsp;&nbsp;}</div>"
    $('.javascript').html(script)
  }
});