<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="node()">
    <xsl:apply-templates select="@*|node()"/>
  </xsl:template>

  <xsl:template match="@id">
    <xsl:message><xsl:value-of select="." /></xsl:message>
  </xsl:template>

</xsl:stylesheet>