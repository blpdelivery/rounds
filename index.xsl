<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <xsl:for-each select="feed/entry">
          <article id="{title}">
            <h2><xsl:value-of select="title" /></h2>
            <xsl:value-of select="content" />
            <div>
              <xsl:for-each select="link[@rel='enclosure']">
                <xsl:choose>
                  <xsl:when text="starts-with(@type, 'image')">
                    <img src="{@href}" />
                  </xsl:when>
                  <xsl:when text="starts-with(@type, 'video')">
                    <video src="{@href}" controls="true" disablepictureinpicture="true" loop="true"><a href="{@href}" download="">Download video</a></video>
                  </xsl:when>
                </xsl:choose>
              </xsl:for-each>
            </div>
          </article>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
    