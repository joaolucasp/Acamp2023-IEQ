let urlBd = `https://docs.google.com/forms/d/e/1FAIpQLSehSkWUaQvZkfOrVsVcTUPlxPNpBC7-fHJbjteUab7vdEpfgQ/formResponse?entry.48324874=${camping_person.nome}&entry.629868263=${camping_person.sobrenome}&entry.1034895676=${camping_person.apelido}&entry.1940460283=${camping_person.data_nascimento}&entry.1161803427=${camping_person.nome_acompanhante}&entry.2058262346=${camping_person.rg}&entry.1885451675=${camping_person.cpf}&entry.578135239=${camping_person.nome_responsavel}&entry.1696175582=${camping_person.rg_responsavel}&entry.1607304985=${camping_person.ddd}&entry.178624303=${camping_person.numero_telefone}&entry.2024722747=${camping_person.email}&entry.2037355570=${camping_person.zip}&entry.369969493=${camping_person.logradouro}&entry.1459898446=${camping_person.number}&entry.1878625591=${camping_person.bairro}&entry.524296923=${camping_person.localidade}&entry.1310221270=${camping_person.uf}&entry.705938882=${camping_person.igreja}&entry.767284581=${camping_person.outra_igreja}&entry.2032939010=${camping_person.alergias}&entry.1544227927=${camping_person.remedios}&entry.1867977913=${obs}`;

var xhttpBd = new XMLHttpRequest();

xhttpBd.open("GET", urlBd, true);
xhttpBd.send();
