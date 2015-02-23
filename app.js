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
    stats_date = 'LAST_30_DAYS',
    condition = 'Impressions',
    numberOfClicksToPause = '1000',
    percentReduce = '0.75',
    goal = '10'


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
    var script = "<div>function&nbsp;main()&nbsp;{<br/>&nbsp;&nbsp;function&nbsp;getKeywordStats()&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;keywordIterator&nbsp;=&nbsp;AdWordsApp.keywords().forDateRange(<font color='#2a00ff'>'"+keywords_date+"'</font>).withCondition(<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#2a00ff'>'"+ condition +"&nbsp;>&nbsp;0'</font>).get();<br/>&nbsp;&nbsp;&nbsp;&nbsp;<strong><font color='#7f0055'>while</font></strong>&nbsp;(keywordIterator.hasNext())&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Logger.log(oldMaxCPC&nbsp;+&nbsp;<font color='#2a00ff'>',&nbsp;'</font>&nbsp;+&nbsp;NewMaxCPC)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;keyword&nbsp;=&nbsp;keywordIterator.next();<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;stats&nbsp;=&nbsp;keyword.getStatsFor(<font color='#2a00ff'>'"+stats_date+"'</font>);<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;oldMaxCPC&nbsp;=&nbsp;keyword.getMaxCpc()<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><font color='#7f0055'>if</font></strong>&nbsp;(stats.getConvertedClicks()&nbsp;===&nbsp;0)&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#3f7f5f'><strong><font color='#7f0055'>if</font></strong>&nbsp;(stats.getClicks()&nbsp;>&nbsp;"+numberOfClicksToPause+"){<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;keyword.pause();<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><font color='#7f0055'>else</font></strong>{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NewMaxCPC&nbsp;=&nbsp;oldMaxCPC*(1-"+percentReduce+")<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><font color='#7f0055'>else</font></strong>&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;var&nbsp;NewMaxCPC&nbsp;=&nbsp;(stats.getAverageCpc()/(stats.getCost()/stats.getConvertedClicks()))*"+goal+"<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color='#3f7f5f'>//&nbsp;Technical&nbsp;check&nbsp;for&nbsp;Not&nbsp;a&nbsp;number&nbsp;edge&nbsp;case</font><br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><font color='#7f0055'>if</font></strong>&nbsp;(!isNaN(NewMaxCPC))&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;keyword.setMaxCpc(NewMaxCPC)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;};<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>&nbsp;&nbsp;}<br/>&nbsp;&nbsp;getKeywordStats()<br/>}</div>"    
    $('.javascript').html(script)
  }
});